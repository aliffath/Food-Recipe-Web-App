import { Container, Col, Row, Form } from "react-bootstrap";
import Header from "../elements/authHeader/Index";
import InputAuth from "../elements/formInput/Index";
import CheckBookAuth from "../elements/checkBookAuth/Index";
import ButtonAuth from "../elements/btnAuth/Index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    axios.post("http://localhost:5000/login", formData).then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Succcesfully");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    });
  };

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
                <InputAuth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
                <CheckBookAuth onChange={(checked) => setIsChecked(checked)} />
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
