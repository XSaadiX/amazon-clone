import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../images/Amazon_logo.svg.png";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the import path as necessary
import { useAuth } from "./context/GlobalState";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const register = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img className='login-logo' src={Logo} alt='logo-img'></img>
      </Link>
      <div className='login-container'>
        <h1>Sign In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='login-signInBtn'>
            Sign In
          </button>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>
          <button className='login-registerBtn' onClick={register}>
            Create your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
};
