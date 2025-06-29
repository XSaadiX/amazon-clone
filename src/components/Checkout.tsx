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

        <div>
          <h3>Hello, {state.user ? state.user : "Guest"}</h3>
          <h2 className='checkout-title'>Your Shopping Basket</h2>
          <p className='checkout-subtitle'>
            The items in your basket are ready to be purchased.
          </p>
          {basket.map((item) => (
            <CheckoutProduct
              key={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className='checkout-right'>
        <SubTotal />
      </div>
    </div>
  );
}

export default Checkout;
