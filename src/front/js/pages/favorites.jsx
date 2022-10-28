import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

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
  );
};
