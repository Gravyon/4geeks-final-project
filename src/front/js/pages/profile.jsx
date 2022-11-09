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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Navbar from "react-bootstrap/Navbar";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export const Profile = (props) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const params = useParams();
  let auth = store.auth;
  let navigate = useNavigate();
  let profile = store.profile;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const updateUser = async (e) => {
    e.preventDefault();
    // console.log(profile.name, profile.email)
    await actions.updateUser(email, username, password);
    // let onUpdateUser = await actions.updateUser(username, password);
    setUsername("");
    setPassword("");
    setEmail("");
    // onUpdateUser ? navigate("/") : null;
    // if (userUpdate) {
    //   navigate("/profile");
    // } else {
    //   alert("An error ocurred")
    //   navigate("/");
    // }
  };

  useEffect(() => {
    if (store.userId != null) {
      // console.log(store.userId)
      actions.getFavorites();
    }
  }, [store.userId]);

  return (
    <div className="container mx-auto d-flex">
      {auth ? (
        <div className="container mt-5 vh-100 ">
          <div>
            <h1>Welcome to your profile</h1>
          </div>
          <div className="col-9 mx-auto mt-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={4}>
                  <Nav className="flex-column ">
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
                    {/* <Nav.Item>
                      <Nav.Link
                        eventKey="fourth"
                        className="btn btn-dark m-2"
                        style={{ color: "#bdb284" }}
                      >
                        Admin personal info
                      </Nav.Link>
                    </Nav.Item> */}
                  </Nav>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div>
                        <div className="user-profile">
                          <div className="p-2">
                            <h5>Username: {profile.username}</h5>
                          </div>
                          <div className="p-2">
                            <h5>Email: {profile.email}</h5>
                          </div>
                          <div className="p-2">
                            <h5>Password: ********</h5>
                          </div>
                          <div>
                            <Button
                              onClick={toggle}
                              className="p-2 d-flex mb-2"
                              type="button"
                              variant="dark"
                              style={{ color: "#bdb284" }}
                            >
                              Click here to modify your data
                            </Button>
                            <Modal isOpen={modal} toggle={toggle}>
                              <ModalHeader toggle={toggle}>
                                Modify your data
                              </ModalHeader>
                              <ModalBody>
                                <form onSubmit={updateUser}>
                                  <ListGroup>
                                    <ListGroup.Item>
                                      Type your email:{" "}
                                      <Form.Control
                                        type="email"
                                        // placeholder="{profile.email}"
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        value={email}
                                      />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Change your username:{" "}
                                      <Form.Control
                                        type="text"
                                        // placeholder="Change your username"
                                        onChange={(e) =>
                                          setUsername(e.target.value)
                                        }
                                        value={username}
                                      />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Password:{" "}
                                      <Form.Control
                                        type="password"
                                        // placeholder="Change your password"
                                        onChange={(e) =>
                                          setPassword(e.target.value)
                                        }
                                        value={password}
                                      />
                                    </ListGroup.Item>
                                  </ListGroup>
                                  <Button
                                    data-dismiss="form"
                                    type="submit"
                                    color="primary"
                                  >
                                    Save changes
                                  </Button>{" "}
                                </form>
                              </ModalBody>
                              <ModalFooter></ModalFooter>
                            </Modal>
                          </div>
                        </div>
                        <Button
                          className="mt-2 p-2 d-flex"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
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
                                  onClick={() => actions.eliminarCuenta(item)}
                                >
                                  Si
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  data-bs-dismiss="modal"
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
                        <div className="col-12 mx-auto my-4 h-75">
                          <ol>
                            {store.listaFavoritos.length > 0 ? (
                              store.listaFavoritos.map((item, id) => (
                                <li
                                  className="list-group-item border border-1 border border-dark"
                                  key={id}
                                  style={{
                                    background: "#212529",
                                    color: "#908969",
                                  }}
                                >
                                  <div className="d-flex justify-content-between">
                                    <div className="d-flex justify-content-start text-left w-25">
                                      Name: {item?.name}
                                    </div>
                                    <div className="text-left">
                                      <p className="mx-5 text-right">
                                        Price: US${item?.price}
                                      </p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <div className="mx-4">
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarHalf />
                                        <BsStar />
                                        <BsStar />
                                      </div>
                                      <span
                                        className="btn btn-outline-light"
                                        onClick={() =>
                                          actions.eliminarFavoritos(item.id)
                                        }
                                        style={{ color: "#bdb284" }}
                                      >
                                        <b>X</b>
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <p>No tienes ningun favorito</p>
                            )}
                          </ol>
                        </div>
                      </div>
                    </Tab.Pane>
                    {/* <Tab.Pane eventKey="fourth">
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
                    </Tab.Pane> */}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      ) : (
        <div className="d-flex vh-auto vh-100 text-center justify-content-center ">
          <div>
            <h1>Not logged in...</h1>
            <Nav.Link
              className="bg-dark"
              style={{ color: "#bdb284" }}
              href="/login"
            >
              Go to login
            </Nav.Link>
          </div>
        </div>
      )}
    </div>
  );
};
