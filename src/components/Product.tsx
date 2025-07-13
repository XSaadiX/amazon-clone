import StarIcon from "@mui/icons-material/Star";
import "./Product.css";
import { useAuth } from "../context/GlobalState";
import { formatCurrency, truncateText, generateStarRating } from "../utils";
import { useState } from "react";

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
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const addToBasket = async () => {
    setIsAdding(true);

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

    // Show success feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className='product'>
      <div className='product-info'>
        <p className='product-category'>{category}</p>
        <p className='product-title'>{truncateText(title, 60)}</p>
        <p className='product-price'>
          <strong>{formatCurrency(price)}</strong>
        </p>
        <div className='product-rating'>
          {generateStarRating(rating).map((filled, index) => (
            <StarIcon
              key={index}
              className={`product-star ${filled ? "filled" : "empty"}`}
            />
          ))}
          <span className='product-rating-text'>
            ({typeof rating === "number" ? rating.toFixed(1) : "0.0"})
          </span>
        </div>
      </div>
      <img
        src={
          imageError
            ? `https://via.placeholder.com/200x200/f0f0f0/666666?text=No+Image`
            : image
        }
        alt={title}
        className='product-image'
        onError={handleImageError}
        loading='lazy'
      />
      <button
        className={`product-button ${isAdding ? "adding" : ""}`}
        onClick={addToBasket}
        disabled={isAdding}>
        {isAdding ? "Adding..." : "Add to Basket"}
      </button>
    </div>
  );
}
export default Product;
