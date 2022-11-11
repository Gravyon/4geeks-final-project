import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export const ProductCarousel = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex justify-content-center w-100 ">
        {store.product.length > 0 ? (
          store.product.map((item, id) => (
            <Card
              className="mx-4 my-4"
              key={id}
              style={{
                width: "18rem",
                background: "#212529",
                margin: "auto",
                fontFamily: "Rajdhani, sans-serif",
                borderColor: "#b2a97e",
                borderRadius: "15px 50px",
              }}
            >
              <Link
                style={{ textDecoration: "none" }}
                to={"/product-detail/" + (id + 1)}
                onClick={() => actions.cambiaClassNameDetails(id)}
              >
                <Card.Body>
                  <img
                    src={item.url}
                    className="img-fluid rounded p-1"
                    alt="..."
                    style={{ maxHeight: "12rem", borderColor: "#b2a97e" }}
                  />

                  <div style={{ textAlign: "left", marginLeft: "25px" }}>
                    <hr style={{ borderTop: "2px dotted #bdb284" }} />
                    <Card.Title
                      style={{ color: "#bdb284", textDecoration: "none" }}
                    >
                      Name: {item.name}
                    </Card.Title>
                    <hr style={{ borderTop: "2px dotted #bdb284" }} />
                    <Card.Text style={{ color: "#bdb284" }}>
                      Category: {item.category}
                    </Card.Text>
                    <Card.Text style={{ color: "#bdb284" }}>
                      Price: U$S {item.price}
                    </Card.Text>
                    <hr style={{ borderTop: "2px dotted #bdb284" }} />
                  </div>
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

                  {/* <button
                    type="button"
                    onClick={() => handleAddShopping(item.id)}
                    className="btn btn-outline-light d-flex align-bottom"
                    style={{ float: "right", color: "#bdb284" }}
                  >
                    <i className="fa fa-cart-plus"></i>
                  </button> */}

                  <button
                    type="button"
                    className="btn btn-outline-light align-bottom"
                    style={{ color: "#bdb284" }}
                  >
                    <i
                      className="far fa-heart"
                      onClick={() => {
                        handleAddFavorites(item.id);
                      }}
                    ></i>
                  </button>
                  <span
                    className="btn btn-outline-light d-flex justify-content-end"
                    onClick={() => actions.deleteProduct(item.id)}
                    style={{ color: "#bdb284" }}
                  >
                    <b>X</b>
                  </span>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No hay cartas</p>
        )}
      </div>
    </div>
  );
};
