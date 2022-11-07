import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export const Footer = () => {
  return (
    <div className="vh-auto fixed-bottom">
      <Navbar
        className="d-flex position-relative"
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand href="#" className="text-center fixed-bottom">
            Copyright 2022 - Casa Arte
          </Navbar.Brand>
          <div>
            <FacebookShareButton
              url={
                "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io"
              }
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={
                "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io"
              }
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={
                "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io"
              }
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={
                "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io"
              }
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <EmailShareButton
              url={
                "https://3000-gravyon-4geeksfinalproj-40ui9bwpmd5.ws-us74.gitpod.io"
              }
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};
