import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import shoppingIcon from "../../assets/shopping-bag.png";
import { CartContext } from "../../context/cart-context";
import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { cartState } = useContext(CartContext);
  const { itemCount } = cartState;
  const navigate = useNavigate();

  return (
    <div className="cart-container" onClick={() => navigate("/cart")}>
      <img src={shoppingIcon} alt="shopping-cart-icon" />
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </div>
  );
};

export default CartIcon;
