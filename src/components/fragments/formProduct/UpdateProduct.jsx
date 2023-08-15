import { Fragment, useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import "./Recipe.css";

import { detailRecipe, updateRecipe } from "./../../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineWave } from "react-loader-spinner";

const UpdateProduct = () => {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (state) => state.productReducer
  );
  const [image, setImage] = useState(null);
  const [inputData, setInputData] = useState({
    title: "",
    ingredients: "",
    category_id: "",
    photo_url: "",
  });

  useEffect(() => {
    dispatch(detailRecipe(menuId));
  }, []);

  useEffect(() => {
    data &&
      setInputData({
        ...inputData,
        title: data.data.title,
        ingredients: data.data.ingredients,
        photo_url: data.data.image,
        category_id: data.data.category,
      });
  }, [data]);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    e.target.files[0] &&
      setInputData({
        ...inputData,
        photo_url: URL.createObjectURL(e.target.files[0]),
      });
  };

  const postRecipe = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", inputData.title);
    data.append("ingredients", inputData.ingredients);
    data.append("category_id", inputData.category_id);
    data.append("image", image);

    try {
      await dispatch(updateRecipe(data, menuId, navigate));
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
    <Fragment>
      <Container className="my-5">
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          transition={Slide}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Form onSubmit={postRecipe}>
          <div className="mb-3">
            <label
              className="addphoto w-100"
              style={{ height: "250px" }}
              htmlFor="upload-photo"
            >
              <div className="input-photo" id="addphotowrapper">
                <img src={inputData.photo_url} className="input-photo" />

                <p>Change Photo</p>
              </div>
            </label>
            <input
              type="file"
              name="image"
              id="upload-photo"
              onChange={handleImage}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formtitle"></Form.Label>
            <Form.Control
              type="text"
              id="formtitle"
              name="title"
              value={inputData.title}
              onChange={handleInput}
              placeholder="Title"
              style={{ backgroundColor: "#f6f5f4" }}
            />
          </div>
          <div className="mb-2">
            <Form.Label htmlFor="formingredients"></Form.Label>
            <Form.Control
              as="textarea"
              id="formingredients"
              name="ingredients"
              value={inputData.ingredients}
              onChange={handleInput}
              rows={5}
              placeholder="Ingredients"
              style={{ backgroundColor: "#f6f5f4", height: "200px" }}
            />
          </div>
          <Row>
            <Col md={3} className="mt-4">
              <Form.Select
                className="form-select form-select-sm py-3 bg-body-tertiary"
                aria-label="select example"
                value={inputData.category_id}
                onChange={handleInput}
                name="category_id"
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="1">Main Course</option>
                <option value="2">Dessert</option>
                <option value="3">Appetizer</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="my-5 d-flex justify-content-center">
            <button
              type="submit"
              className="border border-0 py-2 px-5 fw-bold text-white rounded"
              style={{ backgroundColor: " #efc81a" }}
            >
              Update
            </button>
          </div>
        </Form>
      </Container>
    </Fragment>
  );
};

export default UpdateProduct;
