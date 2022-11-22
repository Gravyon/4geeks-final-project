import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import logo from "../../img/logo1.png";
import "../../styles/navbar.css";

export const NavbarPrincipal = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    // e.preventDefault();
    // Se utiliza para la barra buscadora
    // Simplemente se guarda en search lo que el usuario escribe y se le pasa a la funcion de filterSearch en flux
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "") {
      actions.getProduct();
    } else {
      actions.filterSearch(e.target.value);
    }
  };

  useEffect(() => {
    if (store.userId != null) {
      actions.getShopping();
    }
  }, [store.userId]);

  let navigate = useNavigate();
  // Controla el logout de usuario, simplemente llama a logout de flux
  const doLogout = () => {
    //false
    let onLogged = actions.logout();

    if (!onLogged) {
      //true
      navigate("/login");
    }
  };

  return (
    <div
      className="position-sticky top-0 z-index-10 "
      id="navbar"
      style={{ zIndex: "10" }}
    >
      <Navbar
        className="navbar"
        bg="dark"
        variant="dark"
        expand="lg"
        style={{ color: "#bdb284" }}
      >
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
              {store.auth ? (
                <Nav.Link href="/profile" style={{ color: "#bdb284" }}>
                  Profile
                </Nav.Link>
              ) : null}{" "}
              {store.auth ? (
                <Nav.Link href="/favorites" style={{ color: "#bdb284" }}>
                  Favorites
                </Nav.Link>
              ) : null}{" "}
              {store.admin ? (
                <Nav.Link href="/upload-img" style={{ color: "#bdb284" }}>
                  Create product
                </Nav.Link>
              ) : null}{" "}
              <Nav.Link href="/contactus" style={{ color: "#bdb284" }}>
                Contact us
              </Nav.Link>
            </Nav>
            <Form
              className="d-flex d-sm-none d-md-inline"
              onClick={() => window.scrollTo(0, 550)}
            >
              <Form.Control
                onChange={handleInput}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
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
            {store.auth ? (
              <Link
                to={"/carrito"}
                className="btn btn-outline-ligth"
                style={{ color: "#bdb284" }}
                type="button"
              >
                <i className="fa fa-cart-plus"></i>
                <span className="badge">{store.shoppingList.length}</span>
              </Link>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
