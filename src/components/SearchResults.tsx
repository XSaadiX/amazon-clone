import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import Product from "./Product";
import "./SearchResults.css";

interface SearchProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: { rate: number; count: number };
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { state } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");

  const query = searchParams.get("q") || "";

  useEffect(() => {
    const filterProducts = () => {
      if (!query.trim()) {
        setFilteredProducts([]);
        setLoading(false);
        return;
      }

      const searchTerm = query.toLowerCase();
      const results = state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );

      // Sort results
      const sortedResults = [...results];
      switch (sortBy) {
        case "price-low":
          sortedResults.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          sortedResults.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          sortedResults.sort((a, b) => {
            const ratingA =
              typeof a.rating === "number"
                ? a.rating
                : typeof a.rating === "object" &&
                  a.rating !== null &&
                  "rate" in a.rating
                ? (a.rating as { rate: number }).rate
                : 0;
            const ratingB =
              typeof b.rating === "number"
                ? b.rating
                : typeof b.rating === "object" &&
                  b.rating !== null &&
                  "rate" in b.rating
                ? (b.rating as { rate: number }).rate
                : 0;
            return ratingB - ratingA;
          });
          break;
        default:
          // Keep relevance order (no additional sorting)
          break;
      }

      // Convert to SearchProduct format
      const searchProducts: SearchProduct[] = sortedResults.map((product) => ({
        ...product,
        rating: {
          rate:
            typeof product.rating === "number"
              ? product.rating
              : typeof product.rating === "object" &&
                product.rating !== null &&
                "rate" in product.rating
              ? (product.rating as { rate: number }).rate
              : Math.ceil(Math.random() * 5),
          count: 100,
        },
      }));

      setFilteredProducts(searchProducts);
      setLoading(false);
    };

    setLoading(true);
    const timeoutId = setTimeout(filterProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [query, state.products, sortBy]);

  if (loading) {
    return (
      <div className='search-results'>
        <div className='search-loading'>
          <div className='search-spinner'></div>
          <p>Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='search-results'>
      <div className='search-header'>
        <h1>
          {filteredProducts.length > 0
            ? `${filteredProducts.length} results for "${query}"`
            : `No results for "${query}"`}
        </h1>

        {filteredProducts.length > 0 && (
          <div className='search-controls'>
            <label htmlFor='sort-select'>Sort by:</label>
            <select
              id='sort-select'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='sort-select'>
              <option value='relevance'>Relevance</option>
              <option value='price-low'>Price: Low to High</option>
              <option value='price-high'>Price: High to Low</option>
              <option value='rating'>Customer Rating</option>
            </select>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className='search-results-grid'>
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              category={product.category}
              rating={
                typeof product.rating === "number"
                  ? product.rating
                  : product.rating?.rate || 0
              }
            />
          ))}
        </div>
      ) : (
        <div className='no-results'>
          <h2>No results found</h2>
          <p>Try checking your spelling or use more general terms</p>
          <div className='search-suggestions'>
            <h3>Search suggestions:</h3>
            <ul>
              <li>Check your spelling</li>
              <li>Try more general terms</li>
              <li>Try different keywords</li>
              <li>Browse our categories</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
