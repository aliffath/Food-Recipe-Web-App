import { Fragment } from "react";
import Navigation from "../components/Navbar";
import Footer from "../components/footer/Index";
import FormUpdate from "../components/fragments/formProduct/UpdateProduct";

const UpdateMenu = () => {
  return (
    <Fragment>
      <Navigation />
      <FormUpdate />
      <Footer />
    </Fragment>
  );
};

export default UpdateMenu;
