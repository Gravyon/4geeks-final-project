import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";

export const Profile = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  //   useEffect(() => {
  //     actions.getUserInfo(params.id);
  //   }, []);

  return (
    <div className="vh-100 container mt-5">
      <h1>Welcome to your profile</h1>
      <div className="col-12">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Your info</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Order history</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Your favorites</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Admin personal info</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div>
                    <h5>Username: user1</h5>
                    <h5>Email: 123</h5>
                    <h5>Password: ********</h5>
                    <Button variant="warning">Delete account</Button>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div>
                    <ListGroup>
                      <ListGroup.Item>Order number 1</ListGroup.Item>
                      <ListGroup.Item>Order number 2</ListGroup.Item>
                      <ListGroup.Item>Order number 3</ListGroup.Item>
                      <ListGroup.Item>Order number 4</ListGroup.Item>
                      <ListGroup.Item>Order number 5</ListGroup.Item>
                    </ListGroup>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div>
                    <ListGroup>
                      <ListGroup.Item>Product Name: Equilibrio</ListGroup.Item>
                      <ListGroup.Item>Product Name: Atardecer</ListGroup.Item>
                      <ListGroup.Item>Product Name: Danza</ListGroup.Item>
                      <ListGroup.Item>Product Name: Texturas</ListGroup.Item>
                      <ListGroup.Item>
                        Product Name: Retrato sin pincel
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <div>
                    <ListGroup>
                      <ListGroup.Item>
                        Change email:{" "}
                        <Form.Control
                          type="email"
                          placeholder="Change your email"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Address:{" "}
                        <Form.Control
                          type="text"
                          placeholder="Change your address"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Phone number:{" "}
                        <Form.Control
                          type="text"
                          placeholder="Change your phone number"
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Passport:{" "}
                        <Form.Control
                          type="text"
                          placeholder="Change your passport"
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
};
