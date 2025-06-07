import homeBackground from "../images/home.jpg";
import Product from "./Product";
import "./Home.css";

import { useEffect } from "react"; // For side effects (API calls)
import { useAuth } from "../context/GlobalState"; // Access global state
import { fetchProducts } from "../services/api"; // Assuming you have an API utility to fetch products
interface Product {
  id: number; // Assuming id is a number, adjust if it's a string
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
}

function Home() {
  const { state, dispatch } = useAuth();
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts(); // Fetch products from API
        dispatch({
          type: "SET_PRODUCT",
          products: products, // Dispatch action to set products in global state
        });
      } catch (error) {
        console.error("Failed to load products: ", error);
      }
    };
    loadProducts();
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='home-container'>
        <img src={homeBackground} alt='home-img' className='home-image' />
        <div className='home-row'>
          {state.products.slice(10, 12).map((product: Product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              category={product.category}
              rating={5}
            />
          ))}
        </div>
        <div className='home-row'>
          {state.products.slice(12, 15).map((product: Product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              category={product.category}
              rating={3}
            />
          ))}
        </div>
        <div className='home-row'>
          {state.products.slice(16, 17).map((product: Product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              category={product.category}
              rating={4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
