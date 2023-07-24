import "./featured-product.styles.scss";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/cart-context";
import { isInCart } from "../../helpers";

const FeaturedProduct = (props) => {
  const { title, imageUrl, price, id, description } = props;
  const product = { title, imageUrl, price, id, description };
  const { cartState, addProduct } = useContext(CartContext);
  const { cartItems } = cartState;
  const navigate = useNavigate();
  return (
    <div className="featured-product">
      <div
        className="featured-image"
        onClick={() => navigate(`/product/${props.id}`)}
      >
        <img src={imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h3>{title}</h3>
        <p>$ {price}</p>
        {isInCart(cartItems, props.id) ? (
          <button
            className="button is-white nomad-btn"
            onClick={() => addProduct(product)}
          >
            ADD MORE
          </button>
        ) : (
          <button
            className="button is-black nomad-btn"
            onClick={() => addProduct(product)}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProduct;
