import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

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
    <div className="container mt-5 vh-auto vh-100">
      <div className="w-25">
        <h1>My Cart </h1>
      </div>
      <div>
        <ol>
          {store.shoppingList.length > 0 ? (
            store.shoppingList.map((item, id) => (
              <li
                className="list-group-item border border-1 border border-dark"
                key={id}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-start">
                    {item?.name}
                    <p className="mx-5">Precio: {item?.price}</p>
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
                      className="close btn btn-danger"
                      onClick={() => actions.deleteShopping(item.id)}
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
      </div>
      <button className="btn btn-dark">
        <Link style={{ color: "#bdb284" }} to={"/checkout"}>
          Checkout
        </Link>
      </button>
    </div>
  );
};
