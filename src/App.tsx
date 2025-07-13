import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";

import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { useAuth } from "./context/GlobalState";
import { auth } from "./firebase";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import SearchResults from "./components/SearchResults";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51RgShmFYQJMZ8XyIiR6fmkaT7CRr4Iv9loezSxjUENbXEl2TlDVgynSUlyecSuST3rLLJnSDA9fsnZ5SN6zLaa3C00jtAuiLf0"
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
          },
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className='app'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path='/search'
            element={
              <>
                <Header />
                <SearchResults />
                <Footer />
              </>
            }
          />
          <Route
            path='/checkout'
            element={
              <>
                <Header />
                <Checkout />
                <Footer />
              </>
            }
          />
          <Route
            path='/payment'
            element={
              <>
                <Header />
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
                <Footer />
              </>
            }
          />
          <Route
            path='/orders'
            element={
              <>
                <Header />
                <Orders />
                <Footer />
              </>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route
            path='*'
            element={
              <>
                <Header />
                <div
                  style={{
                    textAlign: "center",
                    padding: "100px 20px",
                    minHeight: "60vh",
                  }}>
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
