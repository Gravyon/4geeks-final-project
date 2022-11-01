import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ContactUs = () => {
  // definimos los estados
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { actions } = useContext(Context);
  let navigate = useNavigate();

  const doSubmit = (e) => {
    e.preventDefault();
    let onSignUp = actions.SignUp(email, message, firstName, lastName);
    setEmail("");
    setPassword("");
    setUsername("");
    setFirstName("");
    setLastName("");
    onSignUp ? navigate("/") : null;
  };

  return (
    <div className="text-center mt-5 container d-flex justify-content-between vh-100">
      <div>
        <i className="bi bi-envelope"></i>
        <h5 className="pb-5">example@domain.com</h5>
        <i className="bi bi-geo-alt"></i>
        <h5 className="pb-5">
          Av. de las leyes 1234 <br />
          Montevideo-Uruguay
          <i className="bi bi-whatsapp"></i>
        </h5>
        <h5 className="pb-5">+598 2 111 1111</h5>
        <i className="bi bi-facebook"></i>
        <h5 className="pb-5">@yourfbprofile</h5>
        <i className="bi bi-instagram"></i>
        <h5>@yourigprofile</h5>
      </div>
      <div>
        <form onSubmit={doSubmit}>
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
              htmlFor="exampleInputMessage"
              className="form-label opacity-50"
            >
              Your message goes here
            </label>
            <textarea
              type="text"
              aria-label="With textarea"
              className="form-control"
              id="exampleInputMessage"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I am not a robot reCapcha" />
          </Form.Group>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div>
        <h4>We are here</h4>
        <img
          style={{ width: "400px", height: "400px" }}
          src="https://thumbs.dreamstime.com/z/mapa-geogr%C3%A1fico-de-uruguay-con-el-capital-de-montevideo-98137776.jpg"
          alt=""
        />
      </div>
    </div>
  );
};
