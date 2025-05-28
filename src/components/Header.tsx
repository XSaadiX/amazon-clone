import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../images/White-Amazon-Logo-PNG.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>
        <img className='header-logo' src={Logo} alt='amazon-Logo' />
      </Link>
      <div className='header-search'>
        <input className='header-searchInput' />
        <SearchIcon className='header-searchIcon' />
      </div>
      <div className='header-nav'>
        <Link to='/login'>
          <div className='header-option'>
            <div className='header-optionLineOne'>Hello Guest</div>
            <div className='header-optionLineTwo'>Sign In</div>
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
            <span className='header-optionLineTwo header-basketCount'>6</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
