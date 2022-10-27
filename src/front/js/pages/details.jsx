import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";

export const ProductDetail = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getProductDetail(params.id);
  }, []);

  return (
    <div className="container mt-5">
      <div className=" col-9 central-content d-flex justify-content-center">
        <Carousel variant="dark">
          <Carousel.Item>
            <div className="row">
              <div className="col-5">
                <Card style={{ width: "18rem", height: "400px" }}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Nombre de la obra</Card.Title>
                    <Card.Text>Price $</Card.Text>
                    <Button variant="primary">Add to cart</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-7">
                <Card style={{ width: "18rem", height: "400px" }}>
                  <Card.Body>
                    <Card.Title>{store.ProductDetail.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {store.ProductDetail.category}
                    </Card.Subtitle>
                    <Card.Text>Detalles de la obra</Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">
                      Price: $ {store.ProductDetail.price}
                    </Card.Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="input-container">
              <form action="">
                <Form.Label>Comment</Form.Label>
                <div className="row">
                  <Form.Control
                    type="text"
                    placeholder="Leave your comments here please"
                  />
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="col-3 nav"></div>
      <div className="col-9 comments"></div>
    </div>
  );
};
