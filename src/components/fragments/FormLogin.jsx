import { Container, Col, Row, Form } from "react-bootstrap";
import Header from "../elements/authHeader/Index";
import PassAuth from "../elements/formInput/FormPassword";
import InputAuth from "../elements/formInput/FormInput";

import CheckBookAuth from "../elements/checkBookAuth/Index";
import ButtonAuth from "../elements/btnAuth/Index";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { actionLogin } from "./../../redux/actions/auth";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineWave } from "react-loader-spinner";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.authReducer);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    if (!isChecked) {
      toast.warning("Please check the checkboox");
      return;
    }
    try {
      await dispatch(actionLogin(formData, navigate));
    } catch (error) {
      toast.error(isError || "Internal server error");
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          paddingLeft: "50px",
        }}
      >
        <LineWave
          height="345"
          width="340"
          color="#efc81a"
          ariaLabel="line-wave"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          firstLineColor=""
          middleLineColor=""
          lastLineColor=""
        />
      </div>
    );
  }

  return (
    <>
      <Container>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          transition={Bounce}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Row>
          <Col
            md={12}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <Col md={4}>
              <Header judul="Welcome" text="Log in into your exiting account" />
              <Form onSubmit={handleLogin}>
                <InputAuth
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                />
                <PassAuth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />

                <CheckBookAuth checked={isChecked} onChange={handleCheckbox} />
                <ButtonAuth text="Login" />
                <p className="mt-3 d-flex justify-content-center align-items-center">
                  Dont have an account?
                  <span>
                    <Link
                      to="/register"
                      style={{ color: " #efc81a" }}
                      className="text-decoration-none"
                    >
                      Sign Up
                    </Link>
                  </span>
                </p>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormLogin;
