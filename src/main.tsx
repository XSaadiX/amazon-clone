import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalProvider from "./context/GlobalState.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe with your publishable key (replace with your actual key)
const stripePromise = loadStripe("pk_test_your_publishable_key_here");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <GlobalProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </GlobalProvider>
    </Router>
  </StrictMode>
);
