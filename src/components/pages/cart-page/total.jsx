import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";

const Total = (props) => {
  const { itemCount, total } = props;
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className="total-container">
      <div className="total">
        <p>Total items: {itemCount}</p>
        <p>{`Total: $${total}`}</p>
      </div>
      <div className="checkout">
        <button
          className="button is-black"
          onClick={() => navigate("/checkout")}
        >
          CHECKOUT
        </button>
        <button className="button is-white" onClick={clearCart}>
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default Total;
