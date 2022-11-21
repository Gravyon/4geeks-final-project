import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";

import "../../styles/favorites.css";

export const Carrito = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.userId != null) {
      actions.getShopping();
    }
  }, [store.userId]);

  let scoreGenerator = (score) => {
    if (score === 1) {
      return "★";
    } else if (score === 2) {
      return "★★";
    } else if (score === 3) {
      return "★★★";
    } else if (score === 4) {
      return "★★★★";
    } else if (score == 5) {
      return "★★★★★";
    } else {
      return "No rvw";
    }
  };

  return (
    <>
      {store.auth ? (
        <div
          className="container mt-5 vh-sm-auto vh-xl-100 vh-lg-100 min-vh-100 mx-auto"
          style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "1.3rem" }}
        >
          <div className="w-100 mx-auto">
            <h1>My Cart </h1>
          </div>
          <div className="col-12 mx-auto my-4 h-75">
            {store.shoppingList.length > 0 ? (
              store.shoppingList.map((item, id) => (
                <li
                  className="list-group-item border border-1 border border-dark"
                  key={id}
                  style={{ background: "#212529", color: "#908969" }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start text-left w-25">
                      <img
                        src={item.url}
                        className="img-fluid rounded p-1 w-100 mx-1"
                        alt="..."
                        style={{
                          maxHeight: "3rem",
                          maxWidth: "3rem",
                          borderColor: "#b2a97e",
                        }}
                      />
                      Name: {item?.name}
                    </div>
                    <div className="d-flex justify-content-start">
                      <p className="mx-5">Price: US${item?.price}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <div className="mx-4">
                        <p className="card-text">
                          {scoreGenerator(item.score)}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <span
                        className="btn btn-outline-light cartList"
                        onClick={() => actions.deleteShopping(item.id)}
                        style={{ color: "#bdb284" }}
                      >
                        <b>X</b>
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>Cart is empty</p>
            )}

            <div className="mx-auto my-3">
              <button className="btn btn-dark ">
                <Link style={{ color: "#bdb284" }} to={"/checkout"}>
                  Checkout
                </Link>
              </button>
            </div>
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
