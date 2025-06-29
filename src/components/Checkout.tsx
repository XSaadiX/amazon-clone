import "./Checkout.css";
import { useAuth } from "../context/GlobalState";
import checkoutAd from "../images/checkoutAd.jpg";
import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "./SubTotal"; // Assuming you have a SubTotal component

function Checkout() {
  const { state, basket } = useAuth();

  return (
    <div className='checkout'>
      <div className='check-outleft'>
        <img className='checkout-ad' src={checkoutAd}></img>

        <div className='checkout-container'>
          <h2>Hello, {state.user ? state.user : "Guest"}</h2>
          <h2 className='checkout-title'>Your Shopping Basket</h2>

          {basket.length != 0 ? (
            basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                key={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <p>
              {" "}
              Your basket is empty, Click add to basket in home page to add
              items
            </p>
          )}
        </div>
      </div>
      <div className='checkout-right'>
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
