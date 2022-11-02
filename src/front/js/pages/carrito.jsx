import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

export const Carrito = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.userId != null){

      // console.log(store.userId)
      actions.getShopping();
    }
	}, [store.userId]);
  
  
  return (
    <div className="container mt-5 vh-auto">
      <div className="w-25">
        <h1>My Cart </h1>
      </div>
      <div>
        <ol>
          <li>
            <button className="dropdown-item">
              {store.shoppingList.length > 0 ? store.shoppingList.map((item, id) => (
                <li className="list-group-item border border-1" key={id}>
                  {item?.name}
                  <p>Precio: {item?.price}</p>
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarHalf />
                  <BsStar />
                  <BsStar />
                  <span
                    className="close btn btn-danger"
                    onClick={() => actions.deleteShopping(item.id)}
                  >
                    <b>X</b>
                  </span>
                </li>
              )) : <p>Nothing to checkout</p>}
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

