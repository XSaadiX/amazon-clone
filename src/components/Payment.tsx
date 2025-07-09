import React from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "../context/AppReducer";
import { CardElement } from "@stripe/react-stripe-js";
import type { StripeCardElementChangeEvent } from "@stripe/stripe-js";
function Payment() {
  const { basket, state } = useAuth();
  const handleChange = (event: StripeCardElementChangeEvent) => {
    console.log(event);
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
                <button>Proceed to Payment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
