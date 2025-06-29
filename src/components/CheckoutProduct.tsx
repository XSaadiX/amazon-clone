import StarIcon from "@mui/icons-material/Star";
import "./CheckoutProduct.css"; // Assuming you have a CSS file for styling
import { useAuth } from "../context/GlobalState";

interface CheckoutProductProps {
  id: number;
  key: number;
  title: string;
  image: string;
  price: number;
  rating: number;
}

function CheckoutProduct({
  id,
  title,
  image,
  price,
  rating,
}: CheckoutProductProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className='product-star'
          sx={{ color: i < fullStars ? "gold" : "lightgray" }}
        />
      );
    }
    return stars;
  };

  const { dispatch } = useAuth();

  const handleRemoveFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className='checkoutProduct'>
      <img src={image} alt={title} className='checkoutProduct-image' />
      <div className='checkoutProduct-info'>
        <p className='checkoutProduct-title'>{title}</p>
        <p className='checkoutProduct-price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct-rating'>{renderStars()}</div>
        <button onClick={handleRemoveFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
