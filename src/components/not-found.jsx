import Layout from "./shared/layout";

const NotFound = () => {
  const style = {
    fontWeight: "bold",
    textAlign: "center",
  };

  return (
    <Layout>
      <p style={style}>We cannot find that page.</p>
    </Layout>
  );
};

export default NotFound;
