<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Signup = () => {
  //definimos los estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { actions } = useContext(Context);
  let navigate = useNavigate();

  const doSubmit = (e) => {
    e.preventDefault();
    let onSignup = actions.Signup(
      email,
      password,
      username,
      firstName,
      lastName
    );
    setEmail("");
    setPassword("");
    setUsername("");
    setFirstName("");
    setLastName("");
    onSignup ? navigate("/") : null;
  };

  return (
    <div className="text-center mt-5 container">
      <form onSubmit={doSubmit}>
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
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label opacity-50"
          >
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label opacity-50"
          >
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I am not a robot" />
        </Form.Group>
        <Link to={"/"}>
          <button type="button" className="btn btn-primary">
            Back
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
=======
import React, {useState, useContext, useEffect} from "react";
import {Context} from "../store/appContext";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {Component} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignUp = () => { // definimos los estados
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const {actions} = useContext(Context);
    let navigate = useNavigate();

    const doSubmit = (e) => {
        e.preventDefault();
        let onSignUp = actions.signUp(email, password, username, firstName, lastName);
        setEmail("");
        setPassword("");
        setUsername("");
        setFirstName("");
        setLastName("");
        onSignUp ? navigate("/") : null;
    };

    return (<div className="text-center mt-5 container">
        <form onSubmit={doSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label opacity-50">
                    Email address
                </label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                    value={email}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label opacity-50">
                    Username
                </label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    onChange={
                        (e) => setUsername(e.target.value)
                    }
                    value={username}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label opacity-50">
                    Password
                </label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    value={password}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label opacity-50">
                    First Name
                </label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    onChange={
                        (e) => setFirstName(e.target.value)
                    }
                    value={firstName}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label opacity-50">
                    Last Name
                </label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    onChange={
                        (e) => setLastName(e.target.value)
                    }
                    value={lastName}/>
            </div>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="I am not a robot"/>
            </Form.Group>
            <Link to={"/"}>
                <button type="button" className="btn btn-primary">
                    Back
                </button>
            </Link>
            <button type="submit" className="btn btn-primary">
                Sign In
            </button>
        </form>
    </div>);
>>>>>>> 5489a4325f35e6dd8b72cc7f65344e3d70f32e06
};
