import React from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "../context/AppReducer";
import { CardElement } from "@stripe/react-stripe-js";
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { useEffect } from "react";
import axios from "./axios"; // Import the axios instance for API calls
import { useStripe } from "@stripe/react-stripe-js";

function Payment() {
  const { basket, state } = useAuth();
  const [clientSecret, setClientSecret] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [disabled, setDisabled] = React.useState(true);
  const [succeeded, setSucceeded] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const stripe = useStripe();
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    // Update the error state if there's an error with the card input
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div className='payment'>
      <div className='payment-container'>
        <h1>
          Checkout(<Link to='/checkout'>{basket.length} items</Link>)
        </h1>
        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Delivery Address</h3>
            <div className='payment-address'>
              <p>{state?.user}</p>
              <p>Location</p>
            </div>
          </div>
          {/* Delivery Address  */}
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
            <p>Card Details</p>
            <input type='text' placeholder='Card Number' />
            <input type='text' placeholder='Name on Card' />
            <input type='text' placeholder='Expiry Date (MM/YY)' />
            <input type='text' placeholder='CVV' />

            {/* Add more payment details as needed */}
            <form className='payment-detailsForm' onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              {/* Stripe Card Element for secure card input */}
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
                    !stripe || !clientSecret || succeeded || processing
                  }>
                  <span>
                    {processing ? (
                      <p>Processing...</p>
                    ) : (
                      <p>Proceed to Payment</p>
                    )}
                  </span>
                </button>
              </div>
              {error && <div className='payment-error'>{error}</div>}
              {/* Display any error messages */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
