import "./main-section.styles.scss";
import StudioBag from "../../assets/studio-bag.png";

const MainSection = ({ history }) => {
  return (
    <div className="main-section-container">
      <div className="main-section-middle">
        <div className="ms-m-image">
          <img src={StudioBag} alt="studio bag" />
        </div>
        <div className="ms-m-description">
          <h2>Designed for fashion. Crafted for sport.</h2>
          <p>
            We make products for you. Tailored for you. Thoughtfully created for
            design and function. Appropriate for everywhere.
          </p>
          <button
            className="button is-black"
            id="shop-now"
            onClick={() => history("/product/1")}
          >
            STUDIO BAG
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
