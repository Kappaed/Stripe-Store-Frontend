import Layout from "./shared/layout";
import Hero from "./hero/hero";
import MainSection from "./main-section/main-section";
import { useNavigate } from "react-router-dom";
import FeaturedCollection from "./featured-collection/featured-collection";

const Homepage = () => {
  const history = useNavigate();
  return (
    <>
      <Layout>
        <Hero />
        <MainSection history={history} />
        <FeaturedCollection />
      </Layout>
    </>
  );
};

export default Homepage;
