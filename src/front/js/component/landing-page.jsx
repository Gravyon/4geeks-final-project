import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="container w-100">
      <ImgCarousel />
      <div className="container text-align-center my-4" id="h1Container">
        <h1 className="display-4 text-align-center">Find your art!</h1>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center w-100 ">
        {store.product.length > 0 ? (
          store.product.map((item, id) => (
            <Card
              className="mx-4 my-4"
              key={id}
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
                to={"/product-detail/" + (id + 1)}
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
                  {/* <div className="col-6 d-flex justify-content-between">
                    <Link
                      to={"/product-detail/" + (id + 1)}
                      className="btn btn-primary"
                    >
                      Leer mas...
                    </Link>
                  </div> */}

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
                    <ul className="dropdown-menu">
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
