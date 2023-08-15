import { Container, Col, Row, Form } from "react-bootstrap";
import Header from "../elements/authHeader/Index";
import InputAuth from "../elements/formInput/FormInput";
import PassAuth from "../elements/formInput/FormPassword";
import CheckBookAuth from "../elements/checkBookAuth/Index";
import ButtonAuth from "../elements/btnAuth/Index";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { actionRegister } from "./../../redux/actions/auth";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineWave } from "react-loader-spinner";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isLoading } = useSelector((state) => state.authReducer);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }

    if (!isChecked) {
      toast.warning("Please check the checkbox");
      return;
    }
    try {
      await dispatch(actionRegister(formData, navigate));
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
              <Header
                judul="Let's Get Started!"
                text="Create new account to access all features"
              />
              <Form onSubmit={handleSubmit}>
                <InputAuth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Name"
                />

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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter Password"
                />
                <CheckBookAuth onChange={(checked) => setIsChecked(checked)} />
                <ButtonAuth text="Register Account" />
                <p className="mt-3 d-flex justify-content-center align-items-center">
                  Already have account?
                  <span>
                    <Link
                      to="/login"
                      style={{ color: " #efc81a" }}
                      className="text-decoration-none"
                    >
                      Log in Here
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

export default FormRegister;
