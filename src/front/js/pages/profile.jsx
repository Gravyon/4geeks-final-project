import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { GoAlert } from "react-icons/go";
import "../../styles/favorites.css";

export const Profile = (props) => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  let auth = store.auth;
  let profile = store.profile;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  let scoreGenerator = (score) => {
    // Maneja las califcaciones de productos
    if (score === 1) {
      return "★";
    } else if (score === 2) {
      return "★★";
    } else if (score === 3) {
      return "★★★";
    } else if (score === 4) {
      return "★★★★";
    } else if (score == 5) {
      return "★★★★★";
    } else {
      return "No review";
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    // Se llama a updateUser de flux
    await actions.updateUser(email, username, password, name, lastname);
    setUsername("");
    setPassword("");
    setEmail("");
    setName("");
    setLastname("");
  };

  const handleSweetAlert = () => {
    //esta funcion es para hacer que si el usuario no esta logueado al momento de querer agregar un favorito, que lo redireccione a la pagina de login
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const borrar = actions.eliminarCuenta();
        console.log(borrar);
      }
    });
  };

  useEffect(() => {
    if (store.userId != null) {
      actions.getFavorites();
    }
  }, [store.userId]);

  return (
    <div className="container mx-auto d-flex">
      {auth ? (
        <div className="container  vh-100 ">
          <div>
            <h1>Welcome to your profile</h1>
          </div>
          <div className="col-lg-9 col-sm-12 mx-auto mt-5">
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
                        eventKey="third"
                        className="btn btn-dark m-2"
                        style={{ color: "#bdb284" }}
                      >
                        Your favorites
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="second"
                        className="btn btn-dark m-2"
                        style={{ color: "#bdb284" }}
                      >
                        {/* Agregado pero no funciona, seria para el cuarto sprint */}
                        Your orders
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div>
                        <div className="user-profile">
                          <div className="p-2 border-bottom border-end border-dark mb-3">
                            <h5>Username: {profile.username}</h5>
                          </div>
                          <div className="p-2 border-bottom border-end border-dark mb-3">
                            <h5>Email: {profile.email}</h5>
                          </div>
                          <div className="p-2 border-bottom border-end border-dark mb-3">
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
                              <div className="bg-dark text-white">
                                <ModalHeader toggle={toggle}>
                                  Modify your data
                                </ModalHeader>
                                <ModalBody>
                                  <form onSubmit={updateUser}>
                                    <ListGroup>
                                      <ListGroup.Item className="bg-dark text-white">
                                        Change your email:{" "}
                                        <Form.Control
                                          type="email"
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                          value={email}
                                          required
                                        />
                                      </ListGroup.Item>
                                      <ListGroup.Item className="bg-dark text-white">
                                        Change your username:{" "}
                                        <Form.Control
                                          type="text"
                                          onChange={(e) =>
                                            setUsername(e.target.value)
                                          }
                                          value={username}
                                          required
                                        />
                                      </ListGroup.Item>
                                      <ListGroup.Item className="bg-dark text-white">
                                        Password:{" "}
                                        <Form.Control
                                          type="password"
                                          onChange={(e) =>
                                            setPassword(e.target.value)
                                          }
                                          value={password}
                                          required
                                        />
                                      </ListGroup.Item>
                                      <ListGroup.Item className="bg-dark text-white">
                                        name:{" "}
                                        <Form.Control
                                          type="text"
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          value={name}
                                          required
                                        />
                                      </ListGroup.Item>
                                      <ListGroup.Item className="bg-dark text-white">
                                        Lastname:{" "}
                                        <Form.Control
                                          type="text"
                                          onChange={(e) =>
                                            setLastname(e.target.value)
                                          }
                                          value={lastname}
                                          required
                                        />
                                      </ListGroup.Item>
                                    </ListGroup>
                                    <Button
                                      data-dismiss="form"
                                      type="submit"
                                      color="dark"
                                      className="btn btn-dark border border-white"
                                    >
                                      Save changes
                                    </Button>{" "}
                                  </form>
                                </ModalBody>
                                <ModalFooter></ModalFooter>
                              </div>
                            </Modal>
                          </div>
                        </div>
                        <Button
                          className="mt-2 p-2 d-flex"
                          type="button"
                          variant="dark"
                          style={{ color: "#bdb284" }}
                          onClick={() => handleSweetAlert()}
                        >
                          Delete account
                        </Button>
                        <Link style={{ color: "#bdb284" }}></Link>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div>
                        <ListGroup>
                          <Tab.Pane eventKey="third">
                            <div>
                              <div className="col-12 mx-auto my-4 h-75">
                                <ol>
                                  <li
                                    className="list-group-item border border-1 border border-dark"
                                    style={{
                                      background: "#212529",
                                      color: "#908969",
                                    }}
                                  >
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex justify-content-start text-left w-25"></div>
                                      <div className="text-left">
                                        <p className="mx-5 text-right"></p>
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </Tab.Pane>
                          <ListGroup.Item className="bg-dark text-white">
                            Order number 1
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-dark text-white">
                            Order number 2
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-dark text-white">
                            Order number 3
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-dark text-white">
                            Order number 4
                          </ListGroup.Item>
                          <ListGroup.Item className="bg-dark text-white">
                            Order number 5
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div
                        className="container mt-5 vh-100 "
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "1.3rem",
                        }}
                      >
                        <div className="col-12 mx-auto my-4 h-75">
                          <ol className="h-75">
                            {store.listaFavoritos?.length > 0 ? (
                              store.listaFavoritos?.map((item, id) => (
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
                                      <img
                                        src={item.url}
                                        className="img-fluid rounded p-1 w-100 mx-1"
                                        alt="..."
                                        style={{
                                          maxHeight: "3rem",
                                          maxWidth: "3rem",
                                          borderColor: "#b2a97e",
                                        }}
                                      />
                                      {item?.name}
                                    </div>
                                    <div className="text-left">
                                      <p className="mx-5 text-right">
                                        US$ {item?.price}{" "}
                                      </p>
                                    </div>

                                    <div className="d-flex justify-content-end">
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
