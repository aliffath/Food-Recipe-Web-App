import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/Images/user.jpg";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

const Navigation = () => {
  const [profile, setProfile] = useState(null);
  const userToken = localStorage.getItem("token");
  let decoded;

  if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(userToken);
    decoded = decodedToken;
  }
  const navigate = useNavigate();

  useEffect(() => {
    function getProfile() {
      return axios.get(
        import.meta.env.VITE_REACT_BACKEND_URL + `/detail/${decoded?.id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    }

    getProfile().then((res) => {
      setProfile(res.data);
    });
  }, [decoded?.id, userToken]);

  return (
    <>
      <Navbar expand="lg">
        <Container fluid className="shadow">
          <Navbar.Toggle
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Link to="/home" className="text-decoration-none fw-bold fs-5">
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Home
                </Nav.Link>
              </Link>
              <Link
                to="/add-recipe"
                className="text-decoration-none fw-bold fs-5"
              >
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Add Recipe
                </Nav.Link>
              </Link>
              <Link
                to="/detail-profile"
                className="text-decoration-none fw-bold fs-5"
              >
                <Nav.Link as="div" style={{ color: "#2E266F" }}>
                  Profile
                </Nav.Link>
              </Link>
            </Nav>
            {userToken ? (
              <div className="d-flex gap-3">
                <div
                  style={{
                    height: "60px",
                    width: "5px",
                    backgroundColor: "#efc81a",
                  }}
                ></div>
                <Link to={`/edit-profile/${profile?.data[0]?.id}`}>
                  <div>
                    <img
                      src={profile?.data[0]?.photo || user}
                      alt="profile"
                      width="50px"
                      height="50px"
                      className="rounded-circle"
                    />
                  </div>
                </Link>
                <div>
                  <h5 className="m-0">{profile?.data[0]?.name}</h5>
                  <h5
                    className="m-0 fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    Logout
                  </h5>
                </div>
              </div>
            ) : (
              <div className="d-flex gap-4">
                <Link className="text-decoration-none fw-bold" to="/login">
                  Login
                </Link>
                <Link className="text-decoration-none fw-bold" to="/register">
                  Register
                </Link>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
