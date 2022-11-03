import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const Profile = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  let auth = store.auth
  let navigate = useNavigate();
  let profile = store.profile

  // const redirectProfile = () =>{
  //   navigate("/login");
  // }

  //   useEffect(() => {
  //     actions.getUserInfo(params.id);
  //   }, []);

  return (
    <>
    {auth ? (
    <div className="container mt-5 vh-100">
    <h1>Welcome to your profile</h1>
      <div className="col-12">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    className="btn btn-dark m-2"
                    style={{ color: "#bdb284" }}
                  >
                    Your info
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    className="btn btn-dark m-2"
                    style={{ color: "#bdb284" }}
                  >
                    Order history
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    className="btn btn-dark m-2"
                    style={{ color: "#bdb284" }}
                  >
                    Your favorites
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="fourth"
                    className="btn btn-dark m-2"
                    style={{ color: "#bdb284" }}
                  >
                    Admin personal info
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div>
                  <div className="p-2"> 
                    <h5>Username: {profile.username}</h5>
                    </div> 
                  <div className="p-2"> 
                    <h5>Email: {profile.email}</h5>
                    </div> 
                  <div className="p-2"> 
                    <h5>Password: ********</h5>
                    </div> 
                    <Button className="p-2"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      // onClick={}
                      variant="dark"
                      style={{ color: "#bdb284" }}
                    >
                      Click here to modify your data
                    </Button>
                    <Button className="mt-2 p-2 d-flex"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => actions.eliminarFavoritos(item)}
                      variant="dark"
                      style={{ color: "#bdb284" }}
                    >
                      Delete account
                    </Button>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              ¿Deseas borrar tu cuenta?
                            </h1>
                          </div>
                          <div className="modal-body">...</div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-dark"
                              style={{ color: "#bdb284" }}
                              data-bs-dismiss="modal"
                            >
                              Si
                            </button>
                            <button
                              type="button"
                              className="btn btn-dark"
                              style={{ color: "#bdb284" }}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div>
                    <ListGroup>
                      <ListGroup.Item>Order number 1</ListGroup.Item>
                      <ListGroup.Item>Order number 2</ListGroup.Item>
                      <ListGroup.Item>Order number 3</ListGroup.Item>
                      <ListGroup.Item>Order number 4</ListGroup.Item>
                      <ListGroup.Item>Order number 5</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div>
                    <ListGroup>
                      <ListGroup.Item>Product Name: Equilibrio</ListGroup.Item>
                      <ListGroup.Item>Product Name: Atardecer</ListGroup.Item>
                      <ListGroup.Item>Product Name: Danza</ListGroup.Item>
                      <ListGroup.Item>Product Name: Texturas</ListGroup.Item>
                      <ListGroup.Item>
                        Product Name: Retrato sin pincel
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <div>
                    <ListGroup>
                      <ListGroup.Item>
                        Change email:{" "}
                        <Form.Control
                          type="email"
                          placeholder="Change your email"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Address:{" "}
                        <Form.Control
                          type="text"
                          placeholder="Change your address"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Phone number:{" "}
                        <Form.Control
                          type="text"
                          placeholder="Change your phone number"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Passport:{" "}
                        <Form.Control
                          type="text"
                          placeholder="Change your passport"
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>)
: <div className="d-flex vh-auto vh-100 text-center justify-content-center ">
<div> 
  <h1>Not logged in...</h1>
  <Nav.Link className="bg-dark" style={{ color: "#bdb284" }} href="/login">
          Go to login
        </Nav.Link>
  </div>
</div>
  }
</>
  );
};
