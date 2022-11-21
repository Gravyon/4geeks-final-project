import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Scoring } from "../component/scoring.jsx";
import { ProductCarousel } from "../component/product-carousel.jsx";
import { BsHeart } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import { Button } from "reactstrap";
import { AiFillEdit } from "react-icons/ai";

import "../../styles/details.css";

export const ProductDetail = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getProductDetail(params.id);
    actions.getProductRatings(params.id);

    // actions.updateProduct(params.id);

    window.scrollTo(0, 0);

    // actions.mapfavorites();
    actions.comparingFavorites();
  }, [params.id, store.userId]);

  let handleAddShopping = async (id) => {
    //esta funcion es para hacer que si el usuario no esta logueado al momento de querer agregar un favorito, que lo redireccione a la pagina de login
    let msj = await actions.createShopping(id);
    console.log(msj);
    if (msj === "User is not logged in") {
      navigate("/login");
    }
  };

  let handleAddFavorites = async (id) => {
    //esta funcion es para hacer que si el usuario no esta logueado al momento de querer agregar un favorito, que lo redireccione a la pagina de login
    let msj = await actions.createFavorite(id);

    if (msj === "User is not logged in") {
      navigate("/login");
    }
  };

  let scoreTotal;

  if (store.productDetail.score === 1) {
    scoreTotal = "★";
  } else if (store.productDetail.score === 2) {
    scoreTotal = "★★";
  } else if (store.productDetail.score === 3) {
    scoreTotal = "★★★";
  } else if (store.productDetail.score === 4) {
    scoreTotal = "★★★★";
  } else if (store.productDetail.score == 5) {
    scoreTotal = "★★★★★";
  } else {
    scoreTotal = "Product has no review";
  }

  // empieza la funcion para editar producto

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const edit = async (id) => {
    // console.log(edit());
    let response = await actions.updateProduct(
      name,
      description,
      category,
      price,
      url,
      id
    );
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setUrl("");

    if (response.data.msg === "Product updated successfully") {
      navigate("/product-detail/" + params.id);
    }
  };

  return (
    <div>
      <div
        className="col-sm-12 col-md-12 col-lg-8 my-4 m-auto h-100"
        id="product-details"
        style={{ width: "90%" }}
      >
        {/* Comienza la card */}
        <Card className="bg-dark">
          <div
            className="card mb-3 bg-dark text-white"
            style={{ maxWidth: "100%" }}
          >
            <div className="row g-0">
              <div className="col-6">
                <img
                  src={store.productDetail.url}
                  className="img-fluid rounded-start img-fluid"
                  alt="..."
                  style={{
                    border: "1px solid #ddd",
                    bordeRadius: "4px",
                    padding: "20px",
                    margin: "10px",
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-6" style={{ height: "100%" }}>
                <div className="card-body bg-dark text-white ml-5">
                  <div className="h-50">
                    <h1 className="card-title cardTitleDescription">
                      {store.productDetail.name}
                    </h1>
                    <hr style={{ borderTop: "2px #bdb284" }} />

                    <p className="card-text fst-italic">
                      {store.productDetail.category}
                    </p>
                    <p className="card-text h-sm-10 productDescription">
                      <small className="text-muted productDescription">
                        Product description: {store.productDetail.description}
                      </small>
                    </p>
                    <p className="card-text">USD {store.productDetail.price}</p>
                    {scoreTotal !== "Product has no review" ? (
                      <p className="card-text text-warning">{scoreTotal}</p>
                    ) : (
                      <p style={{ color: "grey" }}>
                        ★★★★★ <span>No reviews</span>
                      </p>
                    )}
                  </div>
                  <div>
                    {store.admin ? (
                      <button
                        type="button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <AiFillEdit className="text-white" />
                      </button>
                    ) : null}{" "}
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
                                onSubmit={() => {
                                  console.log(params.id);
                                  edit(params.id);
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
                                    required
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
                    {/* termina el modal de editar producto */}
                  </div>
                  <div className="card-footer align-bottom h-50 ">
                    <div className="buttonsCarritoYFavorito">
                      <div className="d-md-grid gap-md-2 d-sm-flex justify-sm-conten-between">
                        <button
                          className="btn btn-light d-flex justify-content-sm-between justify-content-md-center btn-sm-sm"
                          type="button"
                          onClick={() =>
                            handleAddShopping(store.productDetail.id)
                          }
                        >
                          <i
                            className="fa fa-cart-plus"
                            style={{ fontSize: "1.2rem" }}
                          ></i>
                          <p style={{ fontSize: "1rem" }}>Add to cart</p>
                        </button>
                        <button
                          className="btn btn-light"
                          type="button"
                          onClick={() => {
                            handleAddFavorites(store.productDetail.id);
                          }}
                        >
                          {store.favoriteItem.includes(parseInt(params.id)) ? (
                            store.favoriteHeart
                          ) : (
                            <BsHeart />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {store.auth ? <Scoring /> : null}
        </Card>

        {/* termina la card */}

        <div
          className="row bg-dark"
          id="product-carousel"
          style={{
            width: "100%",
            margin: "auto",
            marginTop: "3%",
            marginBottom: "3%",
          }}
        >
          <div className="col-sm-12 col-md-7 bg-dark text-white ">
            <div>
              <h3
                className="text-center mt-3"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Reviews:
              </h3>
              <div className="scrolleable col-10 m-auto">
                <ul className="list-group">
                  {" "}
                  {store.comments.length > 0 ? (
                    store.comments.map((item, index) => (
                      <div key={index}>
                        <li
                          className="my-3"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        >
                          {item}
                          <p>{item.name}</p>
                        </li>
                        <hr style={{ borderTop: "2px #bdb284" }} />
                      </div>
                    ))
                  ) : (
                    <div className="mt-5">
                      <hr style={{ borderTop: "2px #bdb284" }} />
                      <p className="text-muted text-center ">
                        No comments for this product
                      </p>
                      <hr style={{ borderTop: "2px #bdb284" }} />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-5 bg-dark">
            <h3
              className="text-white my-4"
              style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}
            >
              Related products:
            </h3>
            <ProductCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};
