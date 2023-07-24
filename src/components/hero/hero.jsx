import "./hero.styles.scss";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero is-large is-info hero-image">
      <div className="hero-body">
        <h1 className="hero-title">Modern Bags.</h1>
        <div className="shop-now-btn">
          <button
            className="button is-black"
            id="shop-now"
            onClick={() => navigate("/shop")}
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
