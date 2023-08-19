import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ProductsContextProvider from "./context/products-context";
import CartContextProvider from "./context/cart-context";
import UserContextProvider from "./context/user-context";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MwKUtLMFN1DzlGTSwp6m3Lt7ZOzDl3zUIsZ3Ona1A8DkPQFup0JG8dWfLoteEpc5RSMkqhwgReemXad4evMwL4H00EHITgJqm"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsContextProvider>
        <CartContextProvider>
          <Elements stripe={stripePromise}>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </Elements>
        </CartContextProvider>
      </ProductsContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
