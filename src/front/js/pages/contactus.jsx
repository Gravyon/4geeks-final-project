import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, ValidationError } from "@formspree/react";
import Iframe from "react-iframe";
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
    <form onSubmit={handleSubmit} className="needs-validation">
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol col="6">
            <MDBCard
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "800px" }}
            >
              <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase">Contact Us</h2>
                <p className="text-white-50 mb-5">
                  Please enter your info and we will contact you
                </p>
                <div className="col-12">
                  <MDBInput
                    wrapperClass="mb-2 w-100"
                    labelClass="text-white"
                    label="First Name"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    
                    invalid= {MDBInput.invalid}
                    validation= "Please provide your name"
                  />
                  <ValidationError
                    prefix="FirstName"
                    field="firstName"
                    errors={state.errors}
                  />
                </div>
                <div className="col-12">
                  <MDBInput
                    wrapperClass="mb-2 w-100"
                    labelClass="text-white"
                    label="Last Name"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    invalid= {MDBInput.invalid}
                    validation= "Please provide your lastname"
                  />
                  <ValidationError
                    prefix="LastName"
                    field="lastName"
                    errors={state.errors}
                    required
                  />
                </div>
                <div className="col-12">
                  <MDBInput
                    wrapperClass="mb-2 w-100"
                    labelClass="text-white"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    invalid= {MDBInput.invalid}
                    validation= "Please provide your email"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    required
                  />
                </div>
                <div className="col-12 form-group shadow-textarea">
                  <textarea
                    className="form-control z-depth-1"
                    id="message"
                    name="message"
                    rows="3"
                    placeholder="Write something here..."
                    required
                    invalid= {MDBInput.invalid}
                    validation= "Please provide your feedback, it's very important to us"
                  ></textarea>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                    {/* <div class="mb-3">
    <label for="validationTextarea" class="form-label"></label>
    <textarea class="form-control is-invalid" id="validationTextarea" placeholder="Write something here" required></textarea>
    <div class="invalid-feedback">
    Please provide your feedback, it's very important to us
    </div>
  </div> */}
                  <br />
                </div>
                <button
                  type="submit "
                  className="btn btn-outline-light btn-lg mx-2 px-5"
                  color="white"
                >
                  Submit
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <div className="mx-auto p-2">
            <Iframe
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.7505999753657!2d-56.1650912842493!3d-34.91270538142044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f81a13fd5d817%3A0xe12d2cca3cc32fdc!2sBv.%20Gral.%20Artigas%2C%2011300%20Montevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1sen!2sbr!4v1667919921299!5m2!1sen!2sbr"
              id=""
              className=""
              width="100%"
              height="300px"
            />
          </div>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};
