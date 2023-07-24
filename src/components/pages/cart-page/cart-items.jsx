import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from "../../icons";
import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";

const CartItem = (prop) => {
  const { deleteProduct, addProduct } = useContext(CartContext);
  const productCopy = {
    id: prop.id,
    title: prop.title,
    imageUrl: prop.imageUrl,
    price: prop.price,
    quantity: prop.quantity,
  };

  const { imageUrl, title, price, quantity } = prop;
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h4>{title}</h4>
        <p>${price}</p>
      </div>
      <div className="quantity">
        <p>{`Quantity: ${quantity}`}</p>
      </div>
      <div className="btns-container">
        <button
          className="btn-increase"
          onClick={() => addProduct(productCopy)}
        >
          <PlusCircleIcon width="20px" />
        </button>
        {quantity === 1 ? (
          <button
            className="btn-trash"
            onClick={() => deleteProduct(productCopy)}
          >
            <TrashIcon width="20px" />
          </button>
        ) : (
          <button
            className="btn-decrease"
            onClick={() => deleteProduct(productCopy)}
          >
            <MinusCircleIcon width="20px" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
