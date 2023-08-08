import { Fragment } from "react";
import Navigation from "../components/Navbar";
import Footer from "../components/footer/Index";
import ProfileDetail from "../components/fragments/profiledetail/Index";

const DetailProfile = () => {
  return (
    <Fragment>
      <Navigation />
      <ProfileDetail />
      <Footer />
    </Fragment>
  );
};

export default DetailProfile;
