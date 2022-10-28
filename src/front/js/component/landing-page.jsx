import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="card-group">
      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {store.product.map((item, id) => (
          <Card className="m-3" key={id} style={{ width: "18rem" }}>
            <Card.Body>
              <img
                src={
                  "https://uruguayeduca.anep.edu.uy/sites/default/files/2018-05/Imagen%20del%20recurso_0.jpg"
                }
                className="img-fluid rounded p-1"
                alt="..."
              />
              <Card.Title> {item.name}</Card.Title>
              <Card.Text> {item.category}</Card.Text>
              <Card.Text> {item.price}</Card.Text>
              <Link
                to={"/product-detail/" + (id + 1)}
                className="btn btn-primary"
              >
                Leer mas...
              </Link>
              <button
                type="button"
                onClick={() => actions.getProducts(item.name)}
                className="btn btn-primary"
                style={{ float: "right" }}
              >
                Comprar ahora
              </button>
            </Card.Body>
            <Link to="" className="btn btn-danger">
              <i
                className="far fa-heart"
                onClick={() => actions.marcarFavoritos(item)}
              ></i>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
