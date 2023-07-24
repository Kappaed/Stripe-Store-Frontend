import "./footer.styles.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return <div className="footer">{year} © STRIPED Store</div>;
};

export default Footer;
