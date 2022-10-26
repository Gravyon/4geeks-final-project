import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Footer = () => {
  return (
    <div>
      <Navbar
        className="text-align-center fixed-bottom"
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="#">Copyright 2022 - Casa Arte</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#https://www.instagram.com/">
                <i className="bi bi-instagram"></i>
              </Nav.Link>
              <Nav.Link href="#https://www.facebook.com/">
                <i className="bi bi-facebook"></i>
              </Nav.Link>
              <Nav.Link
                href="#https://mail.google.com/mail/u/0/?pli=1#inbox?compose=new"
                disabled
              >
                <i className="bi bi-envelope"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
