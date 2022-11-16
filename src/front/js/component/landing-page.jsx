import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormGroup, Label, Input, FormText, Form, Button } from "reactstrap";
import swal from "sweetalert";
import Swal from "sweetalert2";
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
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { ImgCarousel } from "../component/imgCarousel.jsx";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (store.userId != null) {
      actions.mapfavorites();
      actions.comparingFavorites();
    }
  }, [store.userId]);

  let handleAddFavorites = async (id) => {
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

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const updateProduct = (e, name, description, category, price, url, id) => {
    actions.updateProduct(name, description, category, price, url);

    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setUrl("");
  };

  const handleSweetAlert = (id) => {
    //esta funcion es para hacer que si el usuario no esta logueado al momento de querer agregar un favorito, que lo redireccione a la pagina de login
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const borrar = actions.deleteProduct(id);
        console.log(borrar);
      }
    });
  };

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
                // onClick={() => actions.cambiaClassNameDetails(item.id)}
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
                    onClick={() => {
                      handleAddFavorites(item.id);
                    }}
                  >
                    {store.favoriteItem.includes(item.id) ? (
                      store.favoriteHeart
                    ) : (
                      <BsHeart />
                    )}
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
                        <div className="modal-content bg-dark text-white">
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
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  actions.updateProduct(
                                    name,
                                    description,
                                    category,
                                    parseInt(price),
                                    url,
                                    item.id
                                  );
                                }}
                              >
                                <label>
                                  <label>Change the name: </label>
                                  <input
                                    className="m-3 d-flex justify-content-between"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                  />

                                  <label>Change the description: </label>
                                  <input
                                    className="m-3 d-flex justify-content-between"
                                    type="text"
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                    value={description}
                                  />

                                  <label>Change the category: </label>
                                  <input
                                    className="m-3 d-flex justify-content-between"
                                    type="text"
                                    onChange={(e) =>
                                      setCategory(e.target.value)
                                    }
                                    value={category}
                                  />

                                  <label>Change the price: </label>
                                  <input
                                    className="m-3 d-flex justify-content-between"
                                    type="number"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                  />

                                  <label>Change the url: </label>
                                  <input
                                    className="m-3 d-flex justify-content-between"
                                    type="text"
                                    onChange={(e) => setUrl(e.target.value)}
                                    value={url}
                                  />
                                </label>
                                <br />
                                <Button
                                  data-dismiss="form"
                                  type="submit"
                                  color="dark"
                                  className="border border-white"
                                >
                                  Save changes
                                </Button>{" "}
                              </form>
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
                    onClick={() => handleSweetAlert(item.id)}
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
