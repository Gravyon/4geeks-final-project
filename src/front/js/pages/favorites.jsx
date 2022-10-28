import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  if (store.listaFavoritos.length === "") {
    ("No tienes ningun favorito");
  }

  return (
    <div className="container mt-5">
      <Link
        className="nav-link dropdown-toggle btn btn-danger text-white"
        to="/"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Favorites {store.listaFavoritos.length}
      </Link>
      <ol>
        <li>
          <button className="dropdown-item">
            {store.listaFavoritos.map((item, id) => (
              <li className="list-group-item border border-1" key={id}>
                {item.name}
                <p>Precio: {item.price}</p>
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
      <button className="btn btn-danger">
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
};
