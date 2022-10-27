import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const doSubmit = (e) => {
    e.preventDefault();
    let onLogged = actions.login(email, password);
    setEmail("");
    setPassword("");
    onLogged ? history.push("/") : null;
  };

  return (
    <div>
      <div className="text-center mt-5 container">
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
          <Link to={"/"}>
            <button type="button" className="btn btn-primary">
              Back
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

{
  /* <Form className="container mt-4">
  <Card.Title>Login</Card.Title>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */
}
