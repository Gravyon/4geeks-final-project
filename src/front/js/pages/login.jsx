import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "../../styles/login.css";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

export const Login = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const doSubmit = async (e) => {
    e.preventDefault();
    let onLogged = await actions.login(email, password);
    // let msj = await actions.login(email, password).response.data.msg;

    console.log(onLogged);
    setEmail("");
    setPassword("");
    // onLogged ? navigate("/") : null;
    if (onLogged === "User doesn't exist") {
      navigate("/signup");
    } else if (onLogged.msg === "Bad email or password") {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={doSubmit}>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password
                </p>

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <p className="small mb-3 pb-lg-2">
                  <Link className="text-white-50" to={"/changePassword"}>
                    Forgot password?
                  </Link>
                </p>

                <button
                  type="submit "
                  className="btn btn-outline-light btn-lg mx-2 px-5"
                  color="white"
                  
                >
                  Login
                </button>

                <div className="d-flex flex-row mt-3 mb-5"></div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Form>
  );
};
