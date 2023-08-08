import { Fragment } from "react";
import Navigation from "../components/Navbar";
import Footer from "../components/footer/Index";
import Main from "../components/fragments/mainDetailProduct/Index";

const DetailMenu = () => {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Footer />
    </Fragment>
  );
};

export default DetailMenu;
