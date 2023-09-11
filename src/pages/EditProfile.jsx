import { Fragment } from "react";
import Navigation from "../components/Navbar";
import Footer from "../components/footer/Index";
import Main from "../components/fragments/formEditUser/Index";

const EditProfile = () => {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Footer />
    </Fragment>
  );
};

export default EditProfile;
