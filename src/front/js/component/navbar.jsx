import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../img/logo1.png";

export const NavbarPrincipal = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const doLogout = () => {
    //false
    let onLogged = actions.logout();

    if (!onLogged) {
      //true
      navigate("/login");
    }
  };
  // es lo mismo a poner !onLogged ? history.push("/login"):null;

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" style={{color: "#bdb284"}}>
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={logo}
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/" style={{color: "#bdb284"}}>Home</Nav.Link>
              <Nav.Link href="/profile" style={{color: "#bdb284"}}>Profile</Nav.Link>
              <Nav.Link href="/favorites" style={{color: "#bdb284"}}>Favorites</Nav.Link>
              <Nav.Link href="/carrito" style={{color: "#bdb284"}}>Shopping</Nav.Link>
              <Nav.Link href="/contactus" style={{color: "#bdb284"}}>Contact us</Nav.Link>
              {/* <Nav.Link href="/login">Login</Nav.Link> */}{" "}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-warning">
                <i className="fa fa-search"></i>
              </Button>
            </Form>
            {!store.auth ? (
              <Nav.Link href="/login" style={{color: "#bdb284"}}>
                Login
              </Nav.Link>
            ) : null}{" "}
            {store.auth ? (
              <Nav.Link
                href="/"
                
                type="button"
                onClick={doLogout}
                style={{color: "#bdb284"}}
              >
                Log out
              </Nav.Link>
            ) : null}
            {!store.auth ? (
              <Nav.Link href="/signup" style={{color: "#bdb284"}}>
                Sign Up
              </Nav.Link>
            ) : null}{" "}
            <button
              className="btn btn-outline-ligth dropdown-toggle"
              style={{color: "#bdb284"}}
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-cart-plus"></i>
              <span className="badge">
                {store.products.length}
              </span>
            </button>
            <ul className="dropdown-menu">
              {store.products.map((item, id) => (
                <li className="p-2" key={id}>
                  {item}
                  <button
                    type="button"
                    onClick={() => actions.removeProduct(item)}
                    className="btn "
                    style={{ float: "right" }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
