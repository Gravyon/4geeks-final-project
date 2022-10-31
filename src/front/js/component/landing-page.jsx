import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const LandingPage = () => {
  const { store, actions } = useContext(Context);

  return (

    <div className="card-group mb-5" width={"100%"} height={"100%"}>
      <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        {store.product.map((item, id) => (

          <Card className="m-3" key={id} style={{ width: "18rem", background: "#212529" }}>
            <Link
              to={"/product-detail/" + (id + 1)}

            >
              <Card.Body>
                
                <img
                  src={item.url}
                  className="img-fluid rounded p-1"
                  alt="..."
                  
                />
                
                <Card.Title> {item.name}</Card.Title>
                <Card.Text> {item.category}</Card.Text>
                <Card.Text> {item.price}</Card.Text>
                <div className="col d-flex justify-content-xxl-between d-flex align-items-end">
                  {/* <div className="col-6 d-flex justify-content-between">
                    <Link
                      to={"/product-detail/" + (id + 1)}
                      className="btn btn-primary"
                    >
                      Leer mas...
                    </Link>
                  </div> */}
                  <div className="col-4 d-flex">
                    <button
                      type="button"
                      onClick={() => actions.getProducts(item.name)}
                      className="btn btn-primary"
                      style={{ float: "right" }}
                    >
                      <i class="fa fa-cart-plus"></i>
                    </button>
                  </div>
                  <div className="col-6 ">
                    <Link to="/" className="btn btn-danger ">
                      <i
                        className="far fa-heart"
                        onClick={() => { actions.marcarFavoritos(item) }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </Card.Body>
            </Link>

          </Card>
        ))}
      </div>
    </div>
  );
};
