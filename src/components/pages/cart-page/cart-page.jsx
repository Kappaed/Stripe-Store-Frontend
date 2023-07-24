import { CartContext } from "../../../context/cart-context";
import { useContext } from "react";
import Layout from "../../shared/layout";
import Total from "./total";
import CartItem from "./cart-items";
import "./cart-page.styles.scss";

const CartPage = () => {
  const { cartState } = useContext(CartContext);
  const { cartItems, itemCount, total } = cartState;
  return (
    <Layout>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">Your Cart is Empty</div>
      ) : (
        <>
          <div className="cart-page">
            <div className="cart-item-container">
              {cartItems.map((itemObj) => (
                <CartItem {...itemObj} key={itemObj.id} />
              ))}
              <Total itemCount={itemCount} total={total} />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
