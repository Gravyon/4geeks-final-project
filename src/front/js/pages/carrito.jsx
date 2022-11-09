import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import "../../styles/favorites.css";

export const Carrito = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.userId != null) {
      // console.log(store.userId)
      actions.getShopping();
    }
  }, [store.userId]);

  console.log(store.shoppingList);

  return (
    <div
      className="container mt-5 vh-100 mx-auto"
      style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "1.3rem" }}
    >
      <div className="w-25 mx-auto">
        <h1>My Cart </h1>
      </div>
      <div className="col-12 mx-auto my-4">
        <ol>
          {store.shoppingList.length > 0 ? (
            store.shoppingList.map((item, id) => (
              <li
                className="list-group-item border border-1 border border-dark"
                key={id}
                style={{ background: "#212529", color: "#908969" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-start text-left w-25">
                    Name: {item?.name}
                  </div>
                  <div className="d-flex justify-content-start">
                    <p className="mx-5">Price: US${item?.price}</p>
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
                      onClick={() => actions.deleteShopping(item.id)}
                      style={{ color: "#bdb284" }}
                    >
                      <b>X</b>
                    </span>
                  </div>
                </div>
              </li>
              // )) : <p>Nothing to checkout</p>}
            ))
          ) : (
            <p>Cart is empty</p>
          )}
        </ol>
        <div className="mx-auto">
          <button className="btn btn-dark ">
            <Link style={{ color: "#bdb284" }} to={"/checkout"}>
              Checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
