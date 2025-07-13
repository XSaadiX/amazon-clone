import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { useAuth } from "./context/GlobalState";
import { auth } from "./firebase"; // Adjust the import path as necessary
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";

function App() {
  const { dispatch } = useAuth();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser.email || authUser.displayName || "Guest",
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    }); // Cleanup function to unsubscribe when component unmounts
  }, [dispatch]);
  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Home />
            </>
          }></Route>
        <Route
          path='/checkout'
          element={
            <>
              <Header />
              <Checkout />
            </>
          }></Route>
        <Route
          path='/payment'
          element={
            <>
              <Header />
              <Payment />
            </>
          }></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<h1>Page Not Found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
