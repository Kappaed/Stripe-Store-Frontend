const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const pid = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (pid === -1) {
        const newCartItem = { ...action.payload, quantity: 1 };
        const newCartItems = [...state.cartItems, newCartItem];
        localStorage.setItem("cart", JSON.stringify(newCartItems));

        return {
          ...state,
          cartItems: newCartItems,
          itemCount: state.itemCount + 1,
          total: state.total + newCartItem.price,
        };
      }

      const newCartItems = [
        ...state.cartItems.slice(0, pid),
        {
          ...state.cartItems[pid],
          quantity: state.cartItems[pid].quantity + 1,
        },
        ...state.cartItems.slice(pid + 1),
      ];

      localStorage.setItem("cart", JSON.stringify(newCartItems));

      return {
        ...state,
        cartItems: newCartItems,
        itemCount: state.itemCount + 1,
        total: state.total + state.cartItems[pid].price,
      };

    case "DELETE_ITEM":
      const deletePID = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (deletePID === -1) {
        return state;
      }

      if (state.cartItems[deletePID].quantity > 1) {
        const newCartItems = [
          ...state.cartItems.slice(0, deletePID),
          {
            ...state.cartItems[deletePID],
            quantity: state.cartItems[deletePID].quantity - 1,
          },
          ...state.cartItems.slice(deletePID + 1),
        ];

        localStorage.setItem("cart", JSON.stringify(newCartItems));

        return {
          ...state,
          cartItems: newCartItems,
          itemCount: state.itemCount - 1,
          total: state.total - state.cartItems[deletePID].price,
        };
      }

      const newCartItems2 = state.cartItems.filter((_, i) => i !== deletePID);
      localStorage.setItem("cart", JSON.stringify(newCartItems2));

      return {
        ...state,
        cartItems: newCartItems2,
        itemCount: state.itemCount - 1,
        total: state.total - state.cartItems[deletePID].price,
      };

    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify([]));
      return { cartItems: [], itemCount: 0, total: 0 };

    default:
      return state;
  }
};

export default cartReducer;
