import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const ProductDetail = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    actions.getProductDetail(params.id);
  }, []);

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
    <div className="vh-100 container mt-5">
      <div
        className="d-flex justify-content-center"
        // col-9 central-content ESTO LO QUITE, ME PARECIO MEJOR
      >
        <Carousel variant="dark">
          {store.product.map((item) => (
            <Carousel.Item key={item.id}>
              <div className="row">
                <div className="col-5 m-0">
                  <Card style={{ width: "18rem", height: "400px" }}>
                    <div style={{ width: "18rem", height: "400px" }}>
                      <Card.Img
                        className="d-flex justify-content-center m-auto"
                        variant="top"
                        style={{ width: "auto", height: "288px" }}
                        src={item?.url}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-center">
                        {item?.name}
                      </Card.Title>
                      <div className="d-flex d-flex justify-content-between">
                        <button
                          type="button"
                          onClick={() => handleAddShopping(item.id)}
                          className="btn btn-outline-light d-flex align-bottom bg-dark"
                          style={{ float: "right", color: "#bdb284" }}
                        >
                          <i className="fa fa-cart-plus"></i>
                        </button>
                        <Link
                          to="/"
                          className="btn btn-outline-light align-bottom bg-dark"
                          style={{ color: "#bdb284" }}
                        >
                          <i
                            className="far fa-heart"
                            onClick={() => {
                              handleAddFavorites(item.id);
                            }}
                          ></i>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-7 m-0">
                  <Card style={{ width: "30rem", height: "400px" }}>
                    <Card.Body>
                      <Card.Title>{item?.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Category: {item?.category}
                      </Card.Subtitle>
                      <Card.Text>Description: {item?.description}</Card.Text>
                      <Card.Text>Price: $ {item?.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="input-container">
                <form action="">
                  <Form.Label>
                    <h1
                      className="mt-4"
                      style={{ float: "right", color: "#bdb284" }}
                    >
                      Comment
                    </h1>
                  </Form.Label>
                  <div className="row">
                    <Form.Control
                      type="text"
                      placeholder="Leave your comments here please"
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn btn-warning text-dark"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="col-3 nav"></div>
      <div className="col-9 comments"></div>
    </div>
  );
};
