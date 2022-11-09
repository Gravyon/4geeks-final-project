import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl,
  CarouselCaption,
} from "reactstrap";

export const ProductDetail = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(params.id - 1);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    actions.getProductDetail(params.id);
  }, []);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === store.product.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? store.product.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = store.product.map((item) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        {/* <img src={item.url} alt={item.altText} /> */}
        <div className="card ">
          <div className="row g-0">
            <div className="col-md-5 d-flex justify-content-center bg-dark">
              <img
                src={item.url}
                className="img-fluid rounded-start"
                alt={item.altText}
              />
            </div>
            <div className="col-md-7">
              <div className="card-body h-100 bg-dark text-white">
                <div>
                  <h1 className="card-title text-center">{item.name}</h1>
                  <hr style={{ borderTop: "2px dotted #bdb284" }} />
                  <p
                    className="card-text"
                    style={{ width: "18rem", height: "21em" }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="card-footer align-bottom ">
                  <h6 className="card-text">Price: USD {item.price}</h6>
                  <hr style={{ borderTop: "2px dotted #bdb284" }} />
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      onClick={() => handleAddShopping(item.id)}
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
                          handleAddFavorites(item.id);
                        }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <CarouselCaption
          className="text-danger"
          captionText={null}
          captionHeader={null}
        /> */}
      </CarouselItem>
    );
  });

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

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={store.product}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </div>
  );
};
