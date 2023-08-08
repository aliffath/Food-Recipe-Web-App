import { Fragment, useEffect, useState } from "react";
import { Container, Nav, Row, Col, Button, Modal } from "react-bootstrap";
// import menu from "../../../assets/Images/bomb-chiken.jpg";
import style from "./style.module.css";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Index = () => {
  const [recipe, setRecipe] = useState([]);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getMyrecipe = (page) => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/myRecipe", {
        params: {
          limit: 2,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        toast.success("Get My Recipe Successfully", { toastId: "1" });
        setRecipe(response.data);
        setTotalPage(response.data.pagination.totalPage);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Recipe Not Found", { toastId: "1" });
      });
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    getMyrecipe(currentPage);
  }, [currentPage]);

  const deleteRecipe = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/deleteRecipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        getMyrecipe();
        toast.success("Delete Recipe Successfully");
      })
      .catch((err) => {
        console.log(err);
        getMyrecipe();
        toast.error("Delete Recipe Failed");
      });
  };

  return (
    <Fragment>
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
        <Nav className="nav">
          <Nav.Item>
            <Nav.Link
              className={`${style.clickable}nav-link active fw-bold text-dark fs-5`}
              data-bs-toggle="tab"
              href="#recipes"
            >
              Recipes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`${style.clickable} fw-bold text-dark fs-5`}
              data-bs-toggle="tab"
              href="#bookmark"
            >
              Bookmarked
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`${style.clickable} fw-bold text-dark fs-5`}
              data-bs-toggle="tab"
              href="#like"
            >
              Liked
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>

      <Container className="tab-content">
        <div className="tab-pane active" id="recipes">
          <Container>
            {recipe?.data?.map((item, index) => {
              return (
                <div key={index}>
                  <Row className="my-5">
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link to={`/detail-menu/${item.id}`}>
                        <img
                          src={item.image}
                          alt="menu"
                          className="rounded object-fit-cover"
                          width="280px"
                          height="280px"
                        />
                      </Link>
                    </Col>
                    <Col md={8}>
                      <div>
                        <h5 className="fw-bold">{item.title}</h5>
                        <p className="fs-5 m-0">Ingredients</p>
                        <ul className="fs-6">
                          {item.ingredients
                            .split(",")
                            .map((ingredients, index) => (
                              <li key={index}>{ingredients.trim()}</li>
                            ))}
                        </ul>
                        <Button
                          className="mb-2 text-white rounded border border-0 p-1 fw-bold"
                          style={{ backgroundColor: "#efc81a" }}
                        >
                          10 Likes - 12 Coments - 3 Bookmark
                        </Button>
                        <div className="d-flex gap-4 my-2">
                          <Button
                            className="border border-0 fw-bold py-1 px-3 rounded"
                            style={{ backgroundColor: "#30c0f3" }}
                          >
                            <Link
                              to={`/update-recipe/${item.id}`}
                              className="text-white text-decoration-none"
                            >
                              Edit Menu
                            </Link>
                          </Button>
                          <Button
                            className="border border-0 fw-bold py-1 px-3 rounded"
                            style={{ backgroundColor: "#F57E71" }}
                            onClick={handleShow}
                          >
                            Delete Menu
                          </Button>

                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Attention!</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure want to delete this product?
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                className="border border-0 fw-bold py-1 px-3 rounded"
                                style={{ backgroundColor: "#2a9235" }}
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="border border-0 fw-bold py-1 px-3 rounded"
                                onClick={() => {
                                  deleteRecipe(item.id);
                                  handleClose();
                                }}
                                style={{ backgroundColor: "#F57E71" }}
                              >
                                Delete
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Container>
        </div>
      </Container>

      <div className="my-5 d-flex justify-content-center gap-5">
        <button
          className="mb-2 text-white rounded border border-0 fw-bold py-2 px-4"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{ backgroundColor: " #efc81a" }}
        >
          <FaArrowLeft /> Previous
        </button>

        <div className="d-flex align-items-center gap-2">
          Show <div className="fw-bold">{recipe?.pagination?.pageNow}</div> From{" "}
          <div className="fw-bold"> {recipe?.pagination?.totalPage}</div>
        </div>
        <button
          className="mb-2 text-white rounded border border-0 fw-bold py-2 px-5"
          onClick={handleNext}
          disabled={currentPage === totalPage}
          style={{ backgroundColor: " #efc81a" }}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </Fragment>
  );
};

export default Index;
