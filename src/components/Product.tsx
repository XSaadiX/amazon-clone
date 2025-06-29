import StarIcon from "@mui/icons-material/Star";
import "./Product.css";
import { useAuth } from "../context/GlobalState"; // Assuming you have a context for global state

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

function Product({ id, title, price, image, rating, category }: ProductProps) {
  const { dispatch } = useAuth();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        price: price,
        image: image,
        rating: rating,
        category: category,
      },
    });
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);

    // Create 5 stars
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className='product-star'
          sx={{ color: i < fullStars ? "gold" : "lightgray" }} // Color based on rating
        />
      );
    }
    return stars;
  };
  return (
    <div className='product'>
      <div className='product-info'>
        <p>{title}</p> {/* Use prop instead of hardcoded */}
        <p className='product-price'>
          <small>$</small>
          <strong>{price}</strong> {/* Use prop instead of hardcoded */}
        </p>
      </div>
      <div className='product-rating'>{renderStars()}</div>
      <img src={image} alt={title} className='product-image' /> {/* Use prop */}
      <button className='product-button' onClick={addToBasket}>
        Add to Basket
      </button>
    </div>
  );
}
export default Product;
