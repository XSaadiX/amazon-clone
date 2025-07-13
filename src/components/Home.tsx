import homeBackground from "../images/home.jpg";
import Product from "./Product";
import "./Home.css";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/GlobalState";
import { fetchProducts } from "../services/api";
import type { Product as APIProduct } from "../services/api";

function Home() {
  const { state, dispatch } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState<APIProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const getRandomProducts = useCallback(
    (products: APIProduct[], count: number): APIProduct[] => {
      const shuffled = shuffleArray(products);
      return shuffled.slice(0, count);
    },
    [shuffleArray]
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();

        // Get unique categories
        const uniqueCategories = Array.from(
          new Set(products.map((p) => p.category))
        );
        setCategories(uniqueCategories);

        // Set random featured products
        setFeaturedProducts(getRandomProducts(products, 12));

        dispatch({
          type: "SET_PRODUCT",
          products: products,
        });
      } catch (error) {
        console.error("Failed to load products: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [dispatch, getRandomProducts]);

  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return featuredProducts;
    }
    return state.products
      .filter((p) => p.category === selectedCategory)
      .slice(0, 12);
  };

  const refreshProducts = () => {
    if (state.products.length > 0) {
      const apiProducts = state.products.map((p) => ({
        ...p,
        rating:
          typeof p.rating === "object" &&
          p.rating !== null &&
          "rate" in p.rating
            ? (p.rating as { rate: number }).rate
            : typeof p.rating === "number"
            ? p.rating
            : 0,
      }));
      setFeaturedProducts(getRandomProducts(apiProducts, 12));
    }
  };

  if (loading) {
    return (
      <div className='home'>
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <h2>Loading amazing products...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='home'>
      <div className='home-container'>
        <img src={homeBackground} alt='home-img' className='home-image' />

        {/* Category Filter */}
        <div className='category-filter'>
          <h2>Shop by Category</h2>
          <div className='category-buttons'>
            <button
              className={selectedCategory === "all" ? "active" : ""}
              onClick={() => setSelectedCategory("all")}>
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <button className='refresh-btn' onClick={refreshProducts}>
            🔄 Refresh Products
          </button>
        </div>

        {/* Featured Products */}
        <div className='featured-section'>
          <h2>Featured Products</h2>
          {/* First row: 3 products */}
          <div className='home-row home-row-3'>
            {getFilteredProducts()
              .slice(0, 3)
              .map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  category={product.category}
                  rating={
                    typeof product.rating === "object" &&
                    product.rating !== null &&
                    "rate" in product.rating
                      ? (product.rating as { rate: number }).rate
                      : typeof product.rating === "number"
                      ? product.rating
                      : Math.ceil(Math.random() * 5)
                  }
                />
              ))}
          </div>
          {/* Second row: 2 products */}
          <div className='home-row home-row-2'>
            {getFilteredProducts()
              .slice(3, 5)
              .map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  category={product.category}
                  rating={
                    typeof product.rating === "object" &&
                    product.rating !== null &&
                    "rate" in product.rating
                      ? (product.rating as { rate: number }).rate
                      : typeof product.rating === "number"
                      ? product.rating
                      : Math.ceil(Math.random() * 5)
                  }
                />
              ))}
          </div>
          {/* Third row: 4 products */}
          <div className='home-row home-row-4'>
            {getFilteredProducts()
              .slice(5, 9)
              .map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  category={product.category}
                  rating={
                    typeof product.rating === "object" &&
                    product.rating !== null &&
                    "rate" in product.rating
                      ? (product.rating as { rate: number }).rate
                      : typeof product.rating === "number"
                      ? product.rating
                      : Math.ceil(Math.random() * 5)
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
