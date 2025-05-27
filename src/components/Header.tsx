import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Amazon_logo.svg.png";

export const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>
        <img className='header-logo' src={Logo} alt='Logo' />
      </Link>
    </div>
  );
};
