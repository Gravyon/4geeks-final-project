import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Carrito = () => {
  const { store, actions } = useContext(Context);

  if (store.products.length === "") {
    ("No tienes ninguna compra");
  }

  // store.compraTotal.map((item, id) => <p>{item.price + item.price} </p>);}

  return (
    <div className="container mt-5">
      <Link
        className="nav-link dropdown-toggle btn btn-danger text-white"
        to="/"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Carrito {store.products.length}
      </Link>
      <ol>
        <li>
          <button className="dropdown-item">
            {store.products.map((item, id) => (
              <li className="list-group-item border border-1" key={id}>
                {item.name}
                <p>Precio: {item.price}</p>
                <span
                  className="close btn btn-danger"
                  onClick={() => actions.removeProduct(item)}
                >
                  <b>X</b>
                </span>
              </li>
            ))}
          </button>
        </li>
      </ol>
      {/* <p>Total: {item.price}</p> */}
      {/* <button className="btn btn-danger">
        <Link to={"/"}>Comprar</Link>
      </button> */}
      <button className="btn btn-danger">
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
};
