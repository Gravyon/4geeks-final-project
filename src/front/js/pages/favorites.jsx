import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  // useEffect(() => {
  //   actions.marcarFavoritos(favorito)
  // })

  // if (store.listaFavoritos.length === "") {
  //   ("No tienes ningun favorito");
  // }

  return (
    <div className="container mt-5 vh-100">
      <div className="w-25">
        <h1>Favorites {store.listaFavoritos.length}</h1>
      </div>
      <div>
        <ol>
          <li>
            <button className="dropdown-item">
              {store.listaFavoritos.map((item, id) => (
                <li className="list-group-item border border-1" key={id}>
                  {item?.name}
                  <p>Precio: {item?.price}</p>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-half"></i>
                  <i className="bi bi-star"></i>
                  <span
                    className="close btn btn-danger"
                    onClick={() => actions.eliminarFavoritos(item)}
                  >
                    <b>X</b>
                  </span>
                </li>
              ))}
            </button>
          </li>
        </ol>
      </div>
      <button className="btn btn-dark">
        <Nav.Link style={{ color: "#bdb284" }} href="/">
          Home
        </Nav.Link>
      </button>
    </div>
  );
};
