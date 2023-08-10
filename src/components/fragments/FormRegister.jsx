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

const FormRegister = () => {
  const navigate = useNavigate();
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

    axios
      .post("http://localhost:5000/register", formData)
      .then((response) => {
        console.log(response);

        toast.success("Register Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to register user");
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
                <InputAuth
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
