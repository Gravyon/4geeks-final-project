import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "../../styles/login.css";

import * as mdb from 'mdb-ui-kit';

export const Login = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const doSubmit = async (e) => {
    e.preventDefault();
    let onLogged = await actions.login(email, password);
    // let msj = await actions.login(email, password).response.data.msg;

    // console.log(onLogged);
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
      <div className="container-fluid text-center">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div col="12">
            <div
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <div className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password
                </p>

                <input
                  // wrapperClass="mb-4 mx-5 w-100"
                  // labelClass="text-white"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                  // onChange={(e) => setEmail(e.target.value)}
                  // value={email}
                  // required
                  // validation= "Please provide your email"
                />
                <input
                  // wrapperClass="mb-4 mx-5 w-100"
                  // labelClass="text-white"
                  // label="Password"
                  // id="formControlLg"
                  // type="password"
                  // size="lg"
                  // onChange={(e) => setPassword(e.target.value)}
                  // value={password}
                  // required
                  // validation= "Please provide your password"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
//     <form className="d-flex justify-content-center align-items-center h-100">
//       <div className="container-fluid">

//      <div className="bg-dark text-white my-5 mx-auto">
//   <div class="form-outline mb-4">
//     <input type="email" id="form1Example1" class="form-control" />
//     <label class="form-label" for="form1Example1">Email address</label>
//   </div>


//   <div class="form-outline mb-4">
//     <input type="password" id="form1Example2" class="form-control" />
//     <label class="form-label" for="form1Example2">Password</label>
//   </div>


//   <div class="row mb-4">

//     <div class="col">

//       <a href="#!">Forgot password?</a>
//     </div>
//   </div>


//   <button type="submit" class="btn btn-primary btn-block">Sign in</button>
//       </div>
//       </div>  
// </form>
  );
};
