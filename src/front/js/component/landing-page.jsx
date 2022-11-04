import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import {
  EmailShareButton,
  FacebookShareButton,
  // HatenaShareButton,
  // InstapaperShareButton,
  // LineShareButton,
  LinkedinShareButton,
  // LivejournalShareButton,
  // MailruShareButton,
  // OKShareButton,
  PinterestShareButton,
  // PocketShareButton,
  // RedditShareButton,
  // TelegramShareButton,
  // TumblrShareButton,
  TwitterShareButton,
  // ViberShareButton,
  // VKShareButton,
  WhatsappShareButton,
  // WorkplaceShareButton
  FacebookShareCount,
  // HatenaShareCount,
  // OKShareCount,
  PinterestShareCount,
  // RedditShareCount,
  // TumblrShareCount,
  // VKShareCount,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  // HatenaIcon,
  // InstapaperIcon,
  // LineIcon,
  LinkedinIcon,
  // LivejournalIcon,
  // MailruIcon,
  // OKIcon,
  PinterestIcon,
  // PocketIcon,
  // RedditIcon,
  // TelegramIcon,
  // TumblrIcon,
  TwitterIcon,
  // ViberIcon,
  // VKIcon,
  // WeiboIcon,
  WhatsappIcon,
  // WorkplaceIcon
} from "react-share";

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
    <div className="card-group mb-5 mt-5">
      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {store.product.length > 0 ? (
          store.product.map((item, id) => (
            <Card
              className="m-3"
              key={id}
              style={{ width: "18rem", background: "#212529", margin: "auto" }}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={"/product-detail/" + (id + 1)}
              >
                <Card.Body>
                  <img
                    src={item.url}
                    className="img-fluid rounded p-1"
                    alt="..."
                    style={{ maxHeight: "12rem" }}
                  />
                  <div style={{ textAlign: "left", marginLeft: "25px" }}>
                    <Card.Title
                      style={{ color: "#bdb284", textDecoration: "none" }}
                    >
                      Name: {item.name}
                    </Card.Title>
                    <Card.Text style={{ color: "#bdb284" }}>
                      Category: {item.category}
                    </Card.Text>
                    <Card.Text style={{ color: "#bdb284" }}>
                      Price: U$S {item.price}
                    </Card.Text>
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

                  <Link
                    to="/"
                    className="btn btn-outline-light align-bottom"
                    style={{ color: "#bdb284" }}
                  >
                    <i
                      className="far fa-heart"
                      onClick={() => {
                        handleAddFavorites(item.id);
                      }}
                    ></i>
                  </Link>

                  {/* empieza el modal */}
                  <div>
                    <h5>Username: user1</h5>
                    <Button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      variant="dark"
                      style={{ color: "#bdb284" }}
                    >
                      Share
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
                              Compartir con:
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
                              <FacebookShareButton
                              // quote={LosMejoresCuadros}
                              // hashtag={FacebookCasaArte}
                              />
                              <FacebookShareCount
                                url={"https://www.facebook.com/"}
                              />
                              <FacebookIcon size={32} round={true} />
                              {/* <PinterestShareButton url={shareUrl} /> */}
                              {/* <TwitterShareButton url={shareUrl} /> */}
                              {/* <WhatsappShareButton url={shareUrl} /> */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* termina el modal */}
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
