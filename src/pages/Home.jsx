import { Fragment } from "react";
import Navigation from "../components/Navbar";
import Footer from "../components/footer/Index";
import Main from "../components/fragments/mainHome/Index";

const Home = () => {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Footer />
    </Fragment>
  );
};

export default Home;
