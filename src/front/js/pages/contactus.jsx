import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, ValidationError } from "@formspree/react";
import Iframe from "react-iframe";


export const ContactUs = () => {
  // definimos los estados
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { actions } = useContext(Context);
  let navigate = useNavigate();

  const [state, handleSubmit] = useForm(process.env.CONTACT_FORM);
  if (state.succeeded) {
    return (
      <h1 className="position-relative position-absolute top-50 start-50 translate-middle">
        Thanks for your feedback!
      </h1>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-3">
            <div
              className="card bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "800px" }}
            >
              <div className="card-body p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase" style={{ color: "#bdb284" }}>Contact Us</h2>
                <p className="text-white-50">
                  Please enter your info and we will contact you
                </p>
                <div className="col-12 p-3">
                  <input
                    className="form-control"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    
                    placeholder="First Name"
                  />
                </div>
                <div className="col-12 p-3">
                  <input
                    id="formControlLg"
                    className="form-control"
                    type="text"
                    size="lg"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    placeholder="Last Name"
                  />
                </div>
                <div className="col-12 p-3">
                  <input
                    id="formControlLg"
                    className="form-control"
                    type="email"
                    size="lg"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    placeholder="Email Address"
                  />
                </div>
                <div className="col-12 form-group shadow-textarea p-3">
                  <textarea
                    className="form-control z-depth-1"
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Write something here..."
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  ></textarea>
                  <br />
                </div>
                <button
                  type="submit "
                  className="btn btn-outline-light btn-lg mx-2 px-5" style={{ color: "#bdb284" }}
                  color="white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="mx-auto p-2">
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.7505999753657!2d-56.1650912842493!3d-34.91270538142044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81a13fd5d817%3A0xe12d2cca3cc32fdc!2sBv.%20Gral.%20Artigas%2C%2011300%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1sen!2sbr!4v1667919921299!5m2!1sen!2sbr"
              id=""
              className=""
              width="100%"
              height="300px"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
