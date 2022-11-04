import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

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
    <div>
      <div className="text-center mt-5 container vh-100">
        <form onSubmit={doSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label opacity-50"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label opacity-50"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <Link to={"/changePassword"}>
            <p>¿Has olvidado tu contraseña?</p>
          </Link>
          <div className="d-flex justify-content-between">
            <Link to={"/"}>
              <button
                type="button"
                className="btn btn-dark"
                style={{ color: "#bdb284" }}
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              className="btn btn-dark"
              style={{ color: "#bdb284" }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
