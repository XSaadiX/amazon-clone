import "./Checkout.css";
import { useAuth } from "../context/GlobalState";
import checkoutAd from "../images/checkoutAd.jpg";
import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "./SubTotal"; // Assuming you have a SubTotal component

function Checkout() {
  const { state, basket } = useAuth();

  return (
    <div className='checkout'>
      <img className='checkout-ad' src={checkoutAd} alt='Checkout Ad' />

      <div className='checkout-content'>
        <div className='checkout-left'>
          <div className='checkout-title'>
            <h2>
              Hello,{" "}
              {state.user
                ? state.user.displayName || state.user.email || "User"
                : "Guest"}
            </h2>
            <h2>Your Shopping Basket</h2>
          </div>

          {basket.length !== 0 ? (
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
            <div className='checkout-empty'>
              <p>Your basket is empty</p>
              <p>Click "Add to basket" on the home page to add items</p>
            </div>
          )}
        </div>

        <div className='checkout-right'>
          <SubTotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
