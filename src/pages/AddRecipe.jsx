import { Fragment } from "react";
import Navigation from "../components/Navbar";
import Form from "../components/fragments/formProduct/AddProduct";
import Footer from "../components/footer/Index";

const AddRecipe = () => {
  return (
    <Fragment>
      <Navigation />
      <Form />
      <Footer />
    </Fragment>
  );
};

export default AddRecipe;
