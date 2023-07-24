import { useContext, useEffect } from "react";
import Layout from "../shared/layout";
import { CartContext } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const { cartState, clearCart } = useContext(CartContext);
  const { cartItems } = cartState;
  const navigate = useNavigate();
  useEffect(() => {
    if (cartItems.length > 0) {
      clearCart();
    }
  }, [clearCart, cartItems]);
  return (
    <Layout>
      <div className="checkout">
        <h1>Thank you for your order.</h1>
        <p>
          We are currently processing your order and we'll send you a
          confirmation email shortly.
        </p>
        <div>
          <button
            className="button is-black nomad-btn submit"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Success;
