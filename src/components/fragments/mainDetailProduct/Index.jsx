import { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BiBookmark, BiLike } from "react-icons/bi";
import "./detailMenu.css";
import photo from "../../../assets/Images/user.jpg";
import { detailRecipe } from "./../../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { LineWave } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
const Index = () => {
  const { menuId } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.productReducer);
  const [comment, setComment] = useState(null);
  const [totalComment, setTotalComment] = useState(0);
  const [inputComment, setInputComment] = useState({
    recipe_id: menuId,
    comment_text: "",
    user_id: localStorage.getItem("id"),
  });

  const getComment = () => {
    axios
      .get(import.meta.env.VITE_REACT_BACKEND_URL + `/coment/${menuId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setTotalComment(res.data.data.length);
        setComment(res.data.data);
        toast.success("Success get comment Recipe");
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${err}`);
      });
  };

  const postComent = (event) => {
    event.preventDefault();
    axios
      .post(
        import.meta.env.VITE_REACT_BACKEND_URL + "/postComent",
        inputComment,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Comment Success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const onChange = (e) => {
    setInputComment({
      ...inputComment,
      [e.target.name]: e.target.value,
    });
    console.log(inputComment);
  };

  useEffect(() => {
    dispatch(detailRecipe(menuId));
    getComment();
  }, [dispatch, menuId]);

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
      <ToastContainer autoClose={1000} />
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
                  <p className="m-0">{data?.data?.author}</p>
                  <p className="m-0 fw-bold">{data?.data?.category}</p>
                </div>
              </div>

              <div>
                <p className="m-0">
                  {new Date(data?.data?.create_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="m-0">20 Likes -{totalComment} Comments</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <h1 className="fw-bold text-center mb-5 color">
            {data?.data?.title}
          </h1>
          <Col md={12} className="d-flex justify-content-center">
            <img
              className="object-fit-cover rounded main-photo"
              src={data?.data?.image}
              alt="image"
              width="800px"
              height="450px"
            />
          </Col>
        </Row>
        <Col md={12} className="my-5">
          <h3 className="fw-semibold">Ingredients</h3>
          <ul>
            {data?.data?.ingredients?.split(",").map((ingredient, index) => (
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
          {comment?.map((item, index) => {
            return (
              <div key={index}>
                <div className="d-flex my-5 coments">
                  <div className="col-md-4 d-flex gap-4 justify-content-center">
                    <img
                      src={photo}
                      alt="profle"
                      width="40px"
                      className="rounded rounded-circle"
                    />

                    <div>
                      <p className="m-0">{item.author}</p>
                      <p className="m-0 fw-bold">{item.formatted_create_at}</p>
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
                    <p className="m-0">{item.comment_text}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="col-md-12 horizontal"></div>
        </Row>
      </Container>

      <div className="container my-5">
        <Form onSubmit={postComent}>
          <div className="mb-3">
            <label htmlFor="coments" className="form-label"></label>
            <textarea
              className="form-control"
              id="comment_text"
              rows="5"
              placeholder="Your Comment Here!"
              style={{ backgroundColor: "#f6f5f4" }}
              value={inputComment.comment_text}
              onChange={onChange}
              name="comment_text"
            ></textarea>
          </div>
          <button
            className="rounded border border-0 text-white fw-bold p-2"
            style={{ backgroundColor: "#ffb167" }}
          >
            Send a comment
          </button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Index;
