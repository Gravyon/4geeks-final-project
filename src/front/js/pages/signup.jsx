import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignUp = () => {
  // definimos los estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { actions } = useContext(Context);
  let navigate = useNavigate();

  const doSubmit = async (e) => {
    e.preventDefault();
    let onSignUp = await actions.signup(username, email, password);

    // console.log(onSignUp.data.msg);
    console.log(onSignUp);
    setEmail("");
    setPassword("");
    setUsername("");

    onSignUp ? navigate("/") : null;
    if (onSignUp === "User email already exists") {
      navigate("/login");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="text-center mt-5 container vh-100">
      <form onSubmit={doSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleName" className="form-label opacity-50">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleName"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label opacity-50">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
          />
        </div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I am not a robot" />
        </Form.Group>
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
