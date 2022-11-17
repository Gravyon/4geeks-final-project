import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Scoring } from "../component/scoring.jsx";
import { ProductCarousel } from "../component/product-carousel.jsx";

import "../../styles/details.css";

export const ProductDetail = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getProductDetail(params.id);
    actions.getProductRatings(params.id);
    window.scrollTo(0, 0);
  }, [params.id]);

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
    console.log(msj);
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

  return (
    <div className="row m-lg-5 w-100 h-100" style={{ width: "100%" }}>
      <div
        className="col-sm-12 col-md-12 col-lg-4 my-4 bg-dark text-white  h-110 h-md-50"
        id="product-carousel"
      >
        <div>
          <h2 className="text-white my-4" style={{ textAlign: "center" }}>
            Related products:
          </h2>
        </div>
        <ProductCarousel />
      </div>
      <div
        className="col-sm-12 col-md-12 col-lg-8 my-4 m-auto h-100"
        id="product-details"
        style={{ width: "60%" }}
      >
        <div
          className="card mb-3 bg-dark text-white"
          style={{ maxWidth: "100%" }}
        >
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src={store.productDetail.url}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <div className="card-body bg-dark text-white">
                <div style={{ height: "75%" }}>
                  <h1 className="card-title">{store.productDetail.name}</h1>
                  <hr style={{ borderTop: "2px dotted #bdb284" }} />

                  <p className="card-text">
                    Category: {store.productDetail.category}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Product description: {store.productDetail.description}
                    </small>
                  </p>
                  <p className="card-text">USD {store.productDetail.price}</p>
                  <p className="card-text">Score: {scoreTotal}</p>
                </div>

                <div className="card-footer align-bottom ">
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      onClick={() => handleAddShopping(store.productDetail.id)}
                      className="btn btn-outline-light d-flex align-bottom bg-dark"
                      style={{ float: "right", color: "#bdb284" }}
                    >
                      <i className="fa fa-cart-plus"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-light align-bottom bg-dark"
                      style={{ color: "#bdb284" }}
                    >
                      <i
                        className="far fa-heart"
                        onClick={() => {
                          handleAddFavorites(store.productDetail.id);
                        }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Scoring />
        </div>
      </div>
      <div
        className="my-4 border border-5 border-dark rounded-4"
        style={{ width: "80%", margin: "auto" }}
      >
        <div>
          <h3 className="text-center">Comments:</h3>
          <div className="scrolleable">
            <ul className="list-group">
              {" "}
              {store.comments.length > 0 ? (
                store.comments.map((item) => <li className="my-3">'{item}'</li>)
              ) : (
                <p>No comments for this product</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
