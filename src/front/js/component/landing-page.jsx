import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="card-group mb-5">
      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {store.product.length > 0 ? (
          store.product.map((item, id) => (
            <Card
              className="m-3"
              key={id}
              style={{ width: "18rem", background: "#212529" }}
            >
              <Link to={"/product-detail/" + (id + 1)}>
                <Card.Body>
                  <img
                    src={item.url}
                    className="img-fluid rounded p-1"
                    alt="..."
                    style={{maxHeight: "12rem"}}
                  />

                  <Card.Title> {item.name}</Card.Title>
                  <Card.Text> {item.category}</Card.Text>
                  <Card.Text> {item.price}</Card.Text>
                  </Card.Body>
                  </Link>
                  <Card.Body>
                  <div className="d-flex align-bottom justify-content-between ">
                    {/* <div className="col-6 d-flex justify-content-between">
                    <Link
                      to={"/product-detail/" + (id + 1)}
                      className="btn btn-primary"
                    >
                      Leer mas...
                    </Link>
                  </div> */}
                    
                      <button
                        type="button"
                        onClick={() => actions.addProducts(item.name)}
                        className="btn btn-primary d-flex align-bottom"
                        style={{ float: "right"}}
                      >
                        <i className="fa fa-cart-plus"></i>
                      </button>
                    
                    
                      <Link to="/" className="btn btn-danger align-bottom">
                        <i
                          className="far fa-heart"
                          onClick={() => { actions.createFavorite(item.id) }}
                        ></i>
                      </Link>
                   
                  </div>
                </Card.Body>
             

            </Card>
          ))) : (<p>No hay cartas</p>)}
      </div>
    </div>
  );
};
