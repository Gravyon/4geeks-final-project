import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import "../../styles/favorites.css";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.userId != null) {
      // console.log(store.userId)
      actions.getFavorites();
      actions.mapfavorites();
    }
  }, [store.userId]);

  return (
    <>
      {store.auth ? (
        <div
          className="container mt-5 vh-100 "
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1.3rem",
          }}
        >
          <div className="w-25 mx-auto">
            <h1>Favorites </h1>
          </div>
          <div className="col-12 mx-auto my-4 h-75">
            <ol className="h-75">
              {store.listaFavoritos.length > 0 ? (
                store.listaFavoritos.map((item, id) => (
                  <li
                    className="list-group-item border border-1 border border-dark"
                    key={id}
                    style={{ background: "#212529", color: "#908969" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-start text-left w-25">
                        Name: {item?.name}
                      </div>
                      <div className="text-left">
                        <p className="mx-5 text-right">
                          Price: US${item?.price}
                        </p>
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
        </div>
      ) : (
        <div className="d-flex vh-auto vh-100 text-center justify-content-center ">
          <div>
            <h1>Not logged in...</h1>
            <Nav.Link
              className="bg-dark"
              style={{ color: "#bdb284" }}
              href="/login"
            >
              Go to login
            </Nav.Link>
          </div>
        </div>
      )}
    </>
  );
};
