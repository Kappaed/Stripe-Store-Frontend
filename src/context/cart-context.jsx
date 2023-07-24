import { createContext, useReducer } from "react";
import cartReducer from "./cart-reducer";

export const CartContext = createContext();

const persistedCartItems = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : null;
const initialState = persistedCartItems
  ? {
      cartItems: persistedCartItems,
      itemCount: persistedCartItems.reduce((agg, c) => agg + c.quantity, 0),
      total: persistedCartItems.reduce(
        (agg, c) => agg + c.quantity * c.price,
        0
      ),
    }
  : { cartItems: [], itemCount: 0, total: 0 };

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProduct = (product) =>
    dispatch({ type: "ADD_ITEM", payload: product });

  const deleteProduct = (product) =>
    dispatch({ type: "DELETE_ITEM", payload: product });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ cartState: state, addProduct, deleteProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
