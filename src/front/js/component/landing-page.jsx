import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
import {
  BsFillHeartFill,
  BsHeart,
  BsFillBrushFill,
  BsFillShareFill,
} from "react-icons/bs";
// import { AiFillEdit } from "react-icons/ai";
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
    // console.log(msj);
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
      <ImgCarousel className="bg-dark" />
      <div className="container text-align-center my-4" id="h1Container">
        <h1 className="display-4 text-align-center">Find your art!</h1>
        <p className="fst-italic">
          “Color is the place where our brain and the universe meet.”{" "}
          <small className="fw-bold">Paul Klee</small>
        </p>
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
                fontFamily: "Roboto, sans-serif",
                // borderColor: "#b2a97e",
                borderRadius: "15px 15px",
              }}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={"/product-detail/" + item.id}
              >
                <Card.Body style={{ marginBottom: "-10%" }}>
                  <img
                    src={item.url}
                    className="img-fluid rounded p-1 "
                    alt="..."
                    style={{ maxHeight: "14rem", borderColor: "#b2a97e" }}
                  />
                  <div className="d-flex justify-content-between mt-2">
                    <Card.Title
                      style={{
                        color: "white",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      {item.name}
                    </Card.Title>

                    <Card.Text
                      style={{
                        color: "white",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        fontStyle: "italic",
                      }}
                    >
                      {item.category}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Link>
              <Card.Body>
                <div className="mb-1">
                  <Card.Text
                    style={{ color: "white", fontSize: "1.4rem" }}
                    className="d-flex justify-content-between"
                  >
                    U$S {item.price}
                    <button
                      type="button"
                      onClick={() => handleAddShopping(item.id)}
                      className="btn d-flex align-bottom"
                      style={{ float: "right", color: "white" }}
                    >
                      <i className="fa fa-cart-plus" style={{ color: "white" }}>
                        {" "}
                        Add to cart
                      </i>
                    </button>
                  </Card.Text>
                </div>
                <div className="d-flex align-bottom justify-content-between mx-auto ">
                  {/* empieza el share */}
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ float: "center", color: "white" }}
                    >
                      <BsFillShareFill />
                    </button>
                    <ul
                      className="dropdown-menu bg-transparent border-0"
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
                    className="btn align-bottom"
                    style={{ color: "white" }}
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
                  {store.admin ? (
                    <span
                      className="btn d-flex justify-content-end"
                      onClick={() => handleSweetAlert(item.id)}
                      style={{ color: "white" }}
                    >
                      <b>X</b>
                    </span>
                  ) : null}{" "}
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
