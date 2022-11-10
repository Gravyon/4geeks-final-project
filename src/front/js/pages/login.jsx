import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "../../styles/login.css";

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
                <h2 className="fw-bold mb-2 text-uppercase" style={{ color: "#bdb284" }}>Login</h2>
                <p className="text-white-50">
                  Please enter your login and password
                </p>
                <div className="form-outline ">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    class="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label class="form-label" for="form1Example2"></label>
                </div>
                <div className="form-outline ">
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <p className="small mb-3 pb-lg-2">
                <br />
                  <Link className="text-white-50" to={"/changePassword"}>
                    Forgot password?
                  </Link>
                </p>

                <button
                  type="submit "
                  className="btn btn-outline-light btn-lg mx-2 px-5" style={{ color: "#bdb284" }}
                  color="white"
                >
                  Login
                </button>

                <div className="d-flex flex-row mt-3 mb-5"></div>

                <div>
                  <p className="mb-0" style={{ color: "#bdb284" }}>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-white-50 fw-bold" >
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
  );
};
