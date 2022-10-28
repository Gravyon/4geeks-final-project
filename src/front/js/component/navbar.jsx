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
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Icono de Casa Arte</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/favorites">Favorites</Nav.Link>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#action2">Products</Nav.Link>
              <Nav.Link href="#action2">Contact</Nav.Link>
              {/* <Nav.Link href="/login">Login</Nav.Link> */}
              <Link to={"/login"}>
                {" "}
                {!store.auth ? (
                  <button type="button" className="btn btn-primary">
                    Login
                  </button>
                ) : null}{" "}
              </Link>
              <Link to={"/"}>
                {store.auth ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={doLogout}
                  >
                    Log out
                  </button>
                ) : null}
              </Link>
              <Link to={"/signup"}>
                {" "}
                {!store.auth ? (
                  <button type="button" className="btn btn-primary">
                    Sign Up
                  </button>
                ) : null}{" "}
              </Link>
              <button
                className="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-cart-shopping"></i>{" "}
                <span className="badge bg-danger rounded-circle">
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
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
