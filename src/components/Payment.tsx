import React from "react";
import "./Payment.css"; // Ensure you have a CSS file for styling
import { Link } from "react-router-dom"; // Import Link for navigation
import { useAuth } from "../context/GlobalState"; // Assuming you have a context for global state management
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { getBasketTotal } from "../context/AppReducer";

function Payment() {
  const { basket, state } = useAuth(); // Assuming useAuth provides the basket state
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
            <form>
              <p>Card Details</p>
              <input type='text' placeholder='Card Number' />
              <input type='text' placeholder='Name on Card' />
              <input type='text' placeholder='Expiry Date (MM/YY)' />
              <input type='text' placeholder='CVV' />

              {/* Add more payment details as needed */}
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
