import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/White-Amazon-Logo-PNG.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAuth } from "../context/GlobalState";
import { auth } from "../firebase";
import { useState } from "react";

export const Header = () => {
  const { state, basket } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAuthentication = () => {
    if (state.user) {
      auth.signOut();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className='header'>
      <Link to='/'>
        <img className='header-logo' src={Logo} alt='amazon-Logo' />
      </Link>

      <div className='header-delivery'>
        <LocationOnIcon className='header-locationIcon' />
        <div className='header-deliveryInfo'>
          <span className='header-optionLineOne'>Deliver to</span>
          <span className='header-optionLineTwo'>United States</span>
        </div>
      </div>

      <form className='header-search' onSubmit={handleSearch}>
        <select className='header-searchSelect'>
          <option value='all'>All</option>
          <option value='electronics'>Electronics</option>
          <option value='clothing'>Clothing</option>
          <option value='jewelery'>Jewelry</option>
        </select>
        <input
          className='header-searchInput'
          type='text'
          placeholder='Search Amazon Clone...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit' className='header-searchButton'>
          <SearchIcon className='header-searchIcon' />
        </button>
      </form>
      <div className='header-nav'>
        <Link to={!state.user ? "/login" : "#"}>
          <div className='header-option' onClick={handleAuthentication}>
            <div className='header-optionLineOne'>
              Hello{" "}
              {state.user
                ? state.user.displayName || state.user.email || "User"
                : "Guest"}
            </div>
            <div className='header-optionLineTwo'>
              {state.user ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </Link>
        <Link to='/orders'>
          <div className='header-option'>
            <div className='header-optionLineOne'>Returns</div>
            <div className='header-optionLineTwo'>& Orders</div>
          </div>
        </Link>
        <div className='header-option'>
          <div className='header-optionLineOne'>Your </div>
          <div className='header-optionLineTwo'>Prime</div>
        </div>
        <Link to='/checkout'>
          <div className='header-optionBasket'>
            <ShoppingBasketIcon className='header-cartIcon' />
            <span className='header-optionLineTwo header-basketCount'>
              {basket.length > 0 ? basket.length : 0}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
