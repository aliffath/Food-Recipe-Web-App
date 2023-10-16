import { Fragment, useEffect, useState } from "react";
import { Container, Nav, Row, Col, Button, Modal } from "react-bootstrap";

import style from "./style.module.css";
// import axios from "axios";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { getMyRecipe, deleteRecipe } from "./../../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { LineWave } from "react-loader-spinner";

const Index = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [modalVisibility, setModalVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const dispatch = useDispatch();
  const { recipe, isLoading } = useSelector((state) => state.myProductReducer);

  const handleClose = () => setModalVisibility({});
  const handleShow = (item) => {
    setItemToDelete(item);
    setModalVisibility({ [item.id]: true });
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteRecipe(itemToDelete.id));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getMyRecipe(currentPage))
      .then((result) => {
        console.log(result);
        setTotalPage(result.data.pagination.totalPage);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [dispatch, currentPage]);

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
                            onClick={() => handleShow(item)}
                          >
                            Delete Menu
                          </Button>

                          <div>
                            <Modal
                              show={modalVisibility[item.id]}
                              onHide={handleClose}
                              backdrop="static"
                              keyboard={false}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Delete</Modal.Title>
                              </Modal.Header>
                              {itemToDelete && (
                                <Modal.Body>
                                  Do you wanna delete{" "}
                                  <strong>{itemToDelete.title}</strong>?
                                </Modal.Body>
                              )}
                              <Modal.Footer>
                                <Button
                                  style={{ backgroundColor: " #00e092" }}
                                  variant=" w-100 text-white fw-bold"
                                  onClick={() => {
                                    if (itemToDelete) {
                                      handleDelete();
                                      handleClose();
                                    }
                                  }}
                                >
                                  Yes
                                </Button>
                                <Button
                                  style={{ backgroundColor: "#F57E71" }}
                                  variant=" w-100 fw-bold"
                                  onClick={handleClose}
                                >
                                  No
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
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
