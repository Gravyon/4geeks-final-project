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
import { BsSearch } from 'react-icons/bs';

export const NavbarPrincipal = () => {
  const { store, actions } = useContext(Context);
  const [ product, setProduct ] = useState([]);
  const [ search, setSearch ] = useState("");

  // const queryGet = () => {
  //   console.log(store.product);
  // };

  const handleInput = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
    console.log(e.target.value);
    if (e.target.value === ""){
      actions.getProduct()
    }
    else {
      actions.filterSearch(e.target.value);
    }
    
  };

  useEffect(() => {
    if (store.userId != null){

      // console.log(store.userId)
      actions.getShopping();
    }
	}, [store.userId]);
  
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
      <Navbar bg="dark" variant="dark" expand="lg" style={{ color: "#bdb284" }}>
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
              <Nav.Link href="/" style={{ color: "#bdb284" }}>
                Home
              </Nav.Link>
              {store.auth ? (<Nav.Link href="/profile" style={{ color: "#bdb284" }}>
                Profile
              </Nav.Link>) : null}{" "}
              {store.auth ? (
              <Nav.Link href="/favorites" style={{ color: "#bdb284" }}>
                Favorites
              </Nav.Link>
              ) : null}{" "}
              {store.auth ? (
              <Nav.Link href="/carrito" style={{ color: "#bdb284" }}>
                Cart
              </Nav.Link>
              ) : null}{" "}
              <Nav.Link href="/contactus" style={{ color: "#bdb284" }}>
                Contact us
              </Nav.Link>
              {/* <Nav.Link href="/login">Login</Nav.Link> */}{" "}
            </Nav>
            <Form className="d-flex">
              <Form.Control onChange={handleInput}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-ligth" style={{ color: "#bdb284" }}>
                <BsSearch />
              </Button>
            </Form>
            {!store.auth ? (
              <Nav.Link href="/login" style={{ color: "#bdb284" }}>
                Login
              </Nav.Link>
            ) : null}{" "}
            {store.auth ? (
              <Nav.Link
                href="/"
                type="button"
                onClick={doLogout}
                style={{ color: "#bdb284" }}
              >
                Log out
              </Nav.Link>
            ) : null}
            {!store.auth ? (
              <Nav.Link href="/signup" style={{ color: "#bdb284" }}>
                Sign Up
              </Nav.Link>
            ) : null}{" "}
            <Link
            to={"/carrito"}
              className="btn btn-outline-ligth"
              style={{color: "#bdb284"}}
              type="button"
              
            >
              <i className="fa fa-cart-plus"></i>
              <span className="badge">
                {store.shoppingList.length}
              </span>
            </Link>
            {/* <ul className="dropdown-menu">
              {store.shoppingList.map((item, id) => (
                <li className="p-2" key={id}>
                  {item}
                  <button
                    type="button"
                    onClick={() => actions.deleteShopping(item.id)}
                    className="btn "
                    style={{ float: "right" }}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
