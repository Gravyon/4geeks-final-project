import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import { Scoring } from "../component/scoring.jsx";
import { ProductCarousel } from "../component/product-carousel.jsx";
import "../../styles/details.css";

export const ProductDetail = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getProductDetail(params.id);
    actions.getProductRatings(params.id);
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
  console.log(store.avgScore);

  if (store.avgScore === 1) {
    scoreTotal = "★";
  } else if (store.avgScore === 2) {
    scoreTotal = "★★";
  } else if (store.avgScore === 3) {
    scoreTotal = "★★★";
  } else if (store.avgScore === 4) {
    scoreTotal = "★★★★";
  } else if (store.avgScore == 5) {
    scoreTotal = "★★★★★";
  } else {
    scoreTotal = "Product has no review";
  }
  console.log(scoreTotal);

  return (
    <div className="row m-lg-5 w-100 h-100">
      <div
        className="col-sm-12 col-md-12 col-lg-4 my-4 bg-dark text-white  h-110"
        id="product-carousel"
      >
        <div>
          <h2 className="text-white" style={{ textAlign: "center" }}>
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
    </div>
  );
};
