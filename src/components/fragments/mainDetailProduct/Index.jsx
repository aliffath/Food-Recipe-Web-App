import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BiBookmark, BiLike } from "react-icons/bi";
import "./detailMenu.css";
import photo from "../../../assets/Images/user.jpg";

const Index = () => {
  const { menuId } = useParams();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getDetail = async () => {
      try {
        const getRecipe = await axios.get(
          import.meta.env.VITE_REACT_BACKEND_URL + `/recipe/${menuId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(getRecipe);
        setData(getRecipe.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, [menuId, token]);

  return (
    <Fragment>
      <Container className="my-5">
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3">
                <div
                  style={{
                    height: "60px",
                    width: "5px",
                    backgroundColor: "#efc81a",
                  }}
                ></div>
                <div>
                  <img
                    src={photo}
                    alt="profle"
                    width={50}
                    className="rounded rounded-circle profile-photo"
                  />
                </div>
                <div>
                  <p className="m-0">{data.author}</p>
                  <p className="m-0 fw-bold">{data.category}</p>
                </div>
              </div>

              <div>
                <p className="m-0">{data.create_at}</p>
                <p className="m-0">20 Likes - 2 Comments</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <h1 className="fw-bold text-center mb-5 color">{data.title}</h1>
          <Col md={12} className="d-flex justify-content-center">
            <img
              className="object-fit-cover rounded main-photo"
              src={data.image}
              alt="image"
              width="800px"
              height="450px"
            />
          </Col>
        </Row>
        <Col md={12} className="my-5">
          <h3 className="fw-semibold">Ingredients</h3>
          <ul>
            {data?.ingredients?.split(",").map((ingredient, index) => (
              <li key={index} className="py-1">
                {ingredient.trim()}
              </li>
            ))}
          </ul>
        </Col>
        <div className="d-flex gap-3 my-5">
          <Button
            className="rounded border-0"
            style={{ backgroundColor: "#efc81a" }}
          >
            <BiBookmark size={30} />
          </Button>
          <Button
            className="rounded border border-warning py-1 px-2"
            style={{ backgroundColor: "white" }}
          >
            <BiLike color="#efc81a" size={30} />
          </Button>
        </div>
      </Container>

      <Container>
        <Row>
          <Col md={12} className="horizontal"></Col>
          <div className="d-flex my-5 coments">
            <div className="col-md-4 d-flex gap-4 justify-content-center">
              <img
                src={photo}
                alt="profle"
                width="40px"
                className="rounded rounded-circle"
              />

              <div>
                <p className="m-0">Karen</p>
                <p className="m-0 fw-bold">20 Recipes</p>
              </div>
              <div
                style={{
                  height: "60px",
                  width: "5px",
                  backgroundColor: "#efc81a",
                }}
              ></div>
            </div>
            <div className="col-md-8 d-flex align-items-center text-coments">
              <p className="m-0">
                wow,i just made this and it was delicious thanks htmlFor sharing
              </p>
            </div>
          </div>
          <div className="d-flex mb-5 coments">
            <div className="col-md-4 d-flex gap-4 justify-content-center">
              <img
                src={photo}
                alt="profle"
                width="40px"
                className="rounded rounded-circle"
              />

              <div>
                <p className="m-0">Ariel</p>
                <p className="m-0 fw-bold">20 Recipes</p>
              </div>
              <div
                style={{
                  height: "60px",
                  width: "5px",
                  backgroundColor: "#efc81a",
                }}
              ></div>
            </div>
            <div className="col-md-8 d-flex align-items-center text-coments">
              <p className="m-0">so simple and delicious</p>
            </div>
          </div>
          <div className="col-md-12 horizontal"></div>
        </Row>
      </Container>

      <div className="container my-5">
        <div className="mb-3">
          <label htmlFor="coments" className="form-label"></label>
          <textarea
            className="form-control"
            id="formcoment"
            rows="5"
            placeholder="Your Comment Here!"
            style={{ backgroundColor: "#f6f5f4" }}
          ></textarea>
        </div>
        <button
          className="rounded border border-0 text-white fw-bold p-2"
          style={{ backgroundColor: "#ffb167" }}
        >
          Send a comment
        </button>
      </div>
    </Fragment>
  );
};

export default Index;
