import { useContext, useEffect } from "react";
import { ProductsContext } from "../../context/products-context";
import { CartContext } from "../../context/cart-context";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../shared/layout";
import "./single-product.styles.scss";

const SingleProduct = () => {
  const { products } = useContext(ProductsContext);
  const { id } = useParams();
  const { cartState, addProduct } = useContext(CartContext);
  const { cartItems } = cartState;
  const navigate = useNavigate();
  const productidx = products.findIndex(
    (product) => Number(product.id) === Number(id)
  );

  useEffect(() => {
    if (productidx === -1) {
      navigate("/shop");
    }
  }, [productidx, navigate]);

  if (productidx === -1) {
    return;
  } else {
    const { imageUrl, title, price, description } = products[productidx];
    const productCopy = { ...products[productidx] };
    const cidx = cartItems.findIndex(
      (cartItem) => Number(cartItem.id) === Number(id)
    );
    return (
      <Layout>
        <div className="single-product-container">
          <div className="product-image">
            <img src={imageUrl} alt="product" />
          </div>
          <div className="product-details">
            <div className="name-price">
              <h3>{title}</h3>
              <p>{price} </p>
            </div>
            <div className="add-to-cart-btns">
              {cidx === -1 ? (
                <button
                  className="button is-black nomad-btn"
                  id="btn-white-outline"
                  onClick={() => addProduct(productCopy)}
                >
                  ADD TO CART
                </button>
              ) : (
                <button
                  className="button is-white nomad-btn"
                  id="btn-white-outline"
                  onClick={() => addProduct(productCopy)}
                >
                  ADD MORE
                </button>
              )}
              <button
                className="button is-black nomad-btn"
                id="btn-white-outline"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
            <div className="product-description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};

export default SingleProduct;
