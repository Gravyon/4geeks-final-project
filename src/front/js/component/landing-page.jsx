import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Label, Input, FormText, Form, Button } from "reactstrap";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { ImgCarousel } from "../component/imgCarousel.jsx";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);

  let handleAddFavorites = async (id) => {
    //esta funcion es para hacer que si el usuario no esta logueado al momento de querer agregar un favorito, que lo redireccione a la pagina de login
    let msj = await actions.createFavorite(id);
    console.log(msj);
    if (msj === "User is not logged in") {
      navigate("/login");
    }
  };

  let handleAddShopping = async (id) => {
    //esta funcion es para hacer que si el usuario no esta logueado al momento de querer agregar un favorito, que lo redireccione a la pagina de login
    let msj = await actions.createShopping(id);
    console.log(msj);
    if (msj === "User is not logged in") {
      navigate("/login");
    }
  };

  // empieza la funcion para editar producto

  // const [name, setName] = useState("");
  // const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [url, setUrl] = useState("");

  // const updateProduct = (e, name, description, category, price, url, id) => {
  //   e.preventDefault;
  //
  // };

  const editSchema = Yup.object().shape({
    name: Yup.string("Enter the name")
      .min(2, "name should be of minimum 4 characters length")
      .max(250, "Too Long!"),
    // .required("Username required"),
    description: Yup.string("Enter the description")
      .min(2, "description should be of minimum 4 characters length")
      .max(300, "Too Long!"),
    // .required("Email required"),
    category: Yup.string("Enter the category")
      .min(2, "category should be of minimum 4 characters length")
      .max(30, "Too Long!"),
    // .required("Password required"),
    price: Yup.number("Enter the price")
      .min(1, "price should be of minimum 1 characters length")
      .max(100, "Too Long!"),
    url: Yup.string("Enter the url")
      .min(2, "url should be of minimum 4 characters length")
      .max(400, "Too Long!"),
  });

  return (
    <div className="container w-100">
      <ImgCarousel />
      <div className="container text-align-center my-4" id="h1Container">
        <h1 className="display-4 text-align-center">Find your art!</h1>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-sm-center justify-content-lg-between w-100 ">
        {store.product.length > 0 ? (
          store.product.map((item) => (
            <Card
              className="mx-1 my-4"
              key={item.id}
              style={{
                width: "18rem",
                background: "#212529",
                margin: "auto",
                fontFamily: "Rajdhani, sans-serif",
                borderColor: "#b2a97e",
                borderRadius: "15px 50px",
              }}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={"/product-detail/" + item.id}
                onClick={() => actions.cambiaClassNameDetails(id)}
              >
                <Card.Body>
                  <img
                    src={item.url}
                    className="img-fluid rounded p-1"
                    alt="..."
                    style={{ maxHeight: "12rem", borderColor: "#b2a97e" }}
                  />
                  <div style={{ textAlign: "left", marginLeft: "25px" }}>
                    <hr style={{ borderTop: "2px dotted #bdb284" }} />
                    <Card.Title
                      style={{ color: "#bdb284", textDecoration: "none" }}
                    >
                      Name: {item.name}
                    </Card.Title>
                    <hr style={{ borderTop: "2px dotted #bdb284" }} />
                    <Card.Text style={{ color: "#bdb284" }}>
                      Category: {item.category}
                    </Card.Text>
                    <Card.Text style={{ color: "#bdb284" }}>
                      Price: U$S {item.price}
                    </Card.Text>
                    <hr style={{ borderTop: "2px dotted #bdb284" }} />
                  </div>
                </Card.Body>
              </Link>
              <Card.Body>
                <div className="d-flex align-bottom justify-content-between ">
                  <button
                    type="button"
                    onClick={() => handleAddShopping(item.id)}
                    className="btn btn-outline-light d-flex align-bottom"
                    style={{ float: "right", color: "#bdb284" }}
                  >
                    <i className="fa fa-cart-plus"></i>
                  </button>

                  {/* empieza el share */}
                  <br />
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-light dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ float: "center", color: "#bdb284" }}
                    >
                      Share
                    </button>
                    <ul
                      className="dropdown-menu bg-transparent"
                      style={{ minWidth: "15rem" }}
                    >
                      <li>
                        <FacebookShareButton
                          url={
                            "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io/product-detail/" +
                            item.id
                          }
                        >
                          <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton
                          className="m-3"
                          url={
                            "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io/product-detail/" +
                            item.id
                          }
                        >
                          <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                        <WhatsappShareButton
                          url={
                            "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io/product-detail/" +
                            item.id
                          }
                        >
                          <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                        <LinkedinShareButton
                          className="m-3"
                          url={
                            "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io/product-detail/" +
                            item.id
                          }
                        >
                          <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                        <EmailShareButton
                          url={
                            "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io/product-detail/" +
                            item.id
                          }
                        >
                          <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                      </li>
                    </ul>
                  </div>
                  {/* termina el share */}
                  <button
                    type="button"
                    className="btn btn-outline-light align-bottom"
                    style={{ color: "#bdb284" }}
                  >
                    <i
                      className="far fa-heart"
                      onClick={() => {
                        handleAddFavorites(item.id);
                      }}
                    ></i>
                  </button>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <img
                        style={{ width: "25px" }}
                        src="https://thumbs.dreamstime.com/b/editar-vector-de-icono-bot%C3%B3n-edici%C3%B3n-plano-moda-la-colecci%C3%B3n-interfaces-usuario-aislado-en-fondo-blanco-ilustraci%C3%B3n-vectorial-164827048.jpg"
                        alt=""
                      />
                    </button>
                    {/* empieza el modal de editar producto */}
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
                              Modify your product
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="modal-body">
                              <Formik
                                //Valores iniciales
                                initialValues={{
                                  name: "",
                                  description: "",
                                  category: "",
                                  price: "",
                                  url: "",
                                }}
                                validationSchema={editSchema}
                                // Declara onSubmit y se le pasan los valores de cada campo, anotandolos con values
                                onSubmit={async (values) => {
                                  let onUpdateProduct =
                                    await actions.updateProduct(
                                      values.name,
                                      values.description,
                                      values.category,
                                      values.price,
                                      values.url,
                                      values.id
                                    );
                                  console.log(values);
                                }}
                              >
                                {({ errors, touched }) => (
                                  <Form
                                  // onSubmit={() => {
                                  //   actions.updateProduct(
                                  //     name,
                                  //     description,
                                  //     category,
                                  //     parseInt(price),
                                  //     url,
                                  //     item.id
                                  //   );
                                  // }}
                                  >
                                    <label>
                                      <Field
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="form-control"
                                      />
                                      {errors.name &&
                                        touched.name &&
                                        errors.name}
                                      <label>Change the name: </label>

                                      <label>Change the description: </label>
                                      <Field
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        className="form-control"
                                      />
                                      {errors.description &&
                                        touched.description &&
                                        errors.description}
                                      <label>Change the category: </label>
                                      <Field
                                        type="text"
                                        name="category"
                                        placeholder="Category"
                                        className="form-control"
                                      />
                                      {errors.category &&
                                        touched.category &&
                                        errors.category}

                                      <label>Change the price: </label>
                                      <Field
                                        type="text"
                                        name="price"
                                        placeholder="Price"
                                        className="form-control"
                                      />
                                      {errors.price &&
                                        touched.price &&
                                        errors.price}

                                      <label>Change the url: </label>
                                      <Field
                                        type="text"
                                        name="url"
                                        placeholder="Url"
                                        className="form-control"
                                      />
                                      {errors.url && touched.url && errors.url}
                                    </label>
                                    <Button
                                      data-dismiss="form"
                                      type="submit"
                                      color="primary"
                                    >
                                      Save changes
                                    </Button>{" "}
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* termina el modal de editar producto */}
                  <span
                    className="btn btn-outline-light d-flex justify-content-end"
                    onClick={() => actions.deleteProduct(item.id)}
                    style={{ color: "#bdb284" }}
                  >
                    <b>X</b>
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No hay cartas</p>
        )}
      </div>
    </div>
  );
};
