import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Scoring } from "../component/scoring.jsx";
import { ProductCarousel } from "../component/product-carousel.jsx";
import {
  BsFillHeartFill,
  BsHeart,
  BsFillBrushFill,
  BsFillShareFill,
} from "react-icons/bs";
import Card from "react-bootstrap/Card";

import "../../styles/details.css";

export const ProductDetail = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getProductDetail(params.id);
    actions.getProductRatings(params.id);
    window.scrollTo(0, 0);
    if (store.userId != null) {
      actions.mapfavorites();
      actions.comparingFavorites();
    }
  }, [params.id, store.userId]);
  // useEffect(() => {
  //   if (store.userId != null) {
  //     actions.mapfavorites();
  //     actions.comparingFavorites();
  //   }
  // }, [store.userId]);

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
    <div>
      <div
        className="col-sm-12 col-md-12 col-lg-8 my-4 m-auto h-100"
        id="product-details"
        style={{ width: "90%" }}
      >
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
                          {store.favoriteItem.includes(params.id) ? (
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
          <Scoring />
        </Card>

        {/* termina la card */}
        {/* <div className="mt-5">
          <Scoring />
        </div> */}
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
