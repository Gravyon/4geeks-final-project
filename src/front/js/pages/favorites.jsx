import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.userId != null) {
      // console.log(store.userId)
      actions.getFavorites();
    }
  }, [store.userId]);

  return (
    <div
      className="container mt-5 vh-auto vh-100 mx-auto"
      style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "1.3rem" }}
    >
      <div className="w-25 mx-auto">
        <h1>Favorites </h1>
      </div>
      <div className="col-12 mx-auto my-4">
        <ol>
          {store.listaFavoritos.length > 0 ? (
            store.listaFavoritos.map((item, id) => (
              <li
                className="list-group-item border border-1 border border-dark"
                key={id}
                style={{ background: "#212529", color: "#908969" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="text-left w-25">Name: {item?.name}</div>
                  <div className="text-left">
                    <p className="mx-5 text-right">Price: US${item?.price}</p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="mx-4">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                      <BsStar />
                    </div>
                    <span
                      className="btn btn-outline-light"
                      onClick={() => actions.eliminarFavoritos(item.id)}
                      style={{ color: "#bdb284" }}
                    >
                      <b>X</b>
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No tienes ningun favorito</p>
          )}
        </ol>
      </div>
      {/* <div className="mx-auto">
        <button className="btn btn-dark">
          <Nav.Link style={{ color: "#bdb284" }} href="/">
            Home
          </Nav.Link>
        </button>
      </div> */}
    </div>
  );
};
