import { Fragment } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./editprofile.css";
import { useParams } from "react-router-dom";

const Index = () => {

    const {userId} = useParams()
  return (
    <Fragment>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-center align-items-center flex-column mt-5">
              <img className="size-img my-3" src="" alt="Profile" />
              <Form.Group>
                <Form.Label htmlFor="upload-photo">
                  Change Profile Picture
                </Form.Label>
                <Form.Control type="file" name="photo" id="upload-photo" />
              </Form.Group>
              <p className="text-center fw-bold fs-4">Sakurajima</p>
            </div>
            <div className="d-flex justify-content-center align-items-center mb-5">
              <Row>
                <Col md={12}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Name :</Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="btn w-100 fw-semibold text-white mt-3"
                      style={{ backgroundColor: "#efc81a" }}
                    >
                      Update Profile
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
