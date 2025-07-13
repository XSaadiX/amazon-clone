import React from "react";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "../context/AppReducer";
import { CardElement } from "@stripe/react-stripe-js";
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { useEffect } from "react";
import axios from "./axios"; // Import the axios instance for API calls
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Payment() {
  const { basket, state, dispatch } = useAuth();
  const [clientSecret, setClientSecret] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [succeeded, setSucceeded] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [cardComplete, setCardComplete] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const Navigate = useNavigate();
  useEffect(() => {
    const getClientSecret = async () => {
      if (basket.length === 0) {
        console.log("Basket is empty, skipping payment intent creation");
        return; // Don't make API call if basket is empty
      }

      try {
        console.log(
          "Creating payment intent for:",
          getBasketTotal(basket) * 100
        );
        const response = await axios({
          method: "post",
          url: `/payments/create`,
          data: {
            total: getBasketTotal(basket) * 100,
          },
        });
        console.log("Payment intent response:", response.data);

        if (response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        } else {
          throw new Error("No client secret received");
        }
      } catch (error: unknown) {
        console.error("Error creating payment intent:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to initialize payment. Please try again.";
        setError(errorMessage);
      }
    };
    getClientSecret();
  }, [basket]);

  const handleChange = (event: StripeCardElementChangeEvent) => {
    // Handle card input changes
    setError(event.error ? event.error.message : "");
    setCardComplete(event.complete);
    console.log("Card complete:", event.complete, "Error:", event.error);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly.");
      setProcessing(false);
      return;
    }

    if (!clientSecret) {
      setError("Payment not initialized. Please refresh the page.");
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not found.");
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
          },
        }
      );

      if (error) {
        setError(error.message || "Payment failed");
        setProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // Store order in Firestore with user UID
        if (state?.user?.uid) {
          try {
            await addDoc(collection(db, "users", state.user.uid, "orders"), {
              basket: state.basket,
              amount: getBasketTotal(state.basket),
              created: new Date().toISOString(),
              paymentIntent: paymentIntent,
            });
            console.log("Order stored in Firestore successfully");
          } catch (error) {
            console.error("Error storing order in Firestore:", error);
          }
        }

        Navigate("/orders", { replace: true });
        dispatch({
          type: "EMPTY_BASKET",
        });
      }
    } catch (paymentError) {
      console.error("Payment error:", paymentError);
      setError("An error occurred during payment processing.");
      setProcessing(false);
    }
  };
  return (
    <div className='payment'>
      <div className='payment-container'>
        <h1>
          Checkout(<Link to='/checkout'>{basket.length} items</Link>)
        </h1>

        {basket.length === 0 ? (
          <div className='payment-section'>
            <h3>Your basket is empty</h3>
            <p>Add some items to your basket before proceeding to payment.</p>
            <Link to='/'>Go back to shopping</Link>
          </div>
        ) : (
          <>
            <div className='payment-section'>
              <div className='payment-title'>
                <h3>Delivery Address</h3>
                <div className='payment-address'>
                  <p>
                    {state?.user?.email || state?.user?.displayName || "Guest"}
                  </p>
                  <p>123 Main Street, City, State 12345</p>
                </div>
              </div>
            </div>

            {/* Review Items  */}
            <div className='payment-section'>
              <div className='payment-title'>
                <h3>Review Items</h3>
              </div>
              <div className='payment-items'>
                {basket.map((item) => (
                  <CheckoutProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.image}
                    rating={item.rating}
                  />
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className='payment-section'>
              <h3>Payment Method</h3>

              <div className='payment-details'>
                <form className='payment-detailsForm' onSubmit={handleSubmit}>
                  <div className='payment-card-section'>
                    <p>Card Details</p>
                    <CardElement
                      onChange={handleChange}
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </div>

                  <div className='payment-priceContainer'>
                    <NumericFormat
                      renderText={(value) => (
                        <h3>
                          Order Total : <strong>{value}</strong>
                        </h3>
                      )}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <button
                      type='submit'
                      disabled={
                        !stripe ||
                        processing ||
                        succeeded ||
                        basket.length === 0 ||
                        !cardComplete
                      }>
                      <span>
                        {processing
                          ? "Processing..."
                          : succeeded
                          ? "Payment Successful!"
                          : `Pay $${getBasketTotal(basket).toFixed(2)}`}
                      </span>
                    </button>
                  </div>
                  {error && <div className='payment-error'>{error}</div>}
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;
