import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Homepage from "./components/Homepage";
import NotFound from "./components/not-found";
import Shop from "./components/pages/shop/shop";
import SingleProduct from "./components/single-product/single-product";
import CartPage from "./components/pages/cart-page/cart-page";
import Checkout from "./components/checkout/checkout";
import Success from "./components/checkout/success";
import Cancelled from "./components/checkout/cancelled";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancelled" element={<Cancelled />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
