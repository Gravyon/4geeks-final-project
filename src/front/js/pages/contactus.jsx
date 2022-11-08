import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, ValidationError } from "@formspree/react";
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

  const [state, handleSubmit] = useForm("xqkjgwpk");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  // const doSubmit = (e) => {
  //   e.preventDefault();
  //   let contactUs = actions.contactus(email, message, firstName, lastName);
  //   setEmail("");
  //   setFirstName("");
  //   setLastName("");
  //   setMessage("");
  //   contactUs ? navigate("/") : null;
  // };

  return (
    <div className="container text-center mt-5 d-flex justify-content-between vh-auto">
      <div className="col-4 mt-5">
        <div className="d-flex justify-content">
          <MDBBtn
            tag="a"
            color="none"
            className="m-1 mx-3"
            style={{ color: "#dd4b39" }}
          >
            <MDBIcon fab icon="google" size="lg" />
          </MDBBtn>
          <h5 className="pb-5">example@gmail.com</h5>
        </div>
        <div className="d-flex justify-content">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNIZCwCHKfC9TS8s14LxiRkChkO7KEcbDgQ&usqp=CAU"
            alt=""
            style={{ borderRadius: "1rem", width: "30px", height: "30px" }}
            className="m-1 mx-3"
          />
          <h5 className="pb-5">Av. de las leyes 1234 Montevideo-Uruguay</h5>
        </div>
        <div className="d-flex justify-content">
          <MDBBtn
            tag="a"
            color="none"
            className="m-1 mx-3"
            style={{ color: "#3b5998" }}
          >
            <MDBIcon fab icon="whatsapp" size="lg" />
          </MDBBtn>

          <h5 className="pb-5">+598 2 111 1111</h5>
        </div>
        <div className="d-flex justify-content">
          <MDBBtn
            tag="a"
            color="none"
            className="m-1 mx-3"
            style={{ color: "#3b5998" }}
          >
            <MDBIcon fab icon="facebook-f" size="lg" />
          </MDBBtn>
          <h5 className="pb-5">@yourfbprofile</h5>
        </div>
        <div className="d-flex justify-content">
          <MDBBtn
            tag="a"
            color="none"
            className="m-1 mx-3"
            style={{ color: "#ac2bac" }}
          >
            <MDBIcon fab icon="instagram" size="lg" />
          </MDBBtn>
          <h5>@yourigprofile</h5>
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-dark text-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "400px" }}
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
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      required
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <textarea id="message" name="message" />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      required
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                    <br />
                    <label htmlFor="">Message</label>
                  </div>
                  <button
                    type="submit "
                    className="btn btn-outline-light btn-lg mx-2 px-5"
                    color="white"
                    outline
                  >
                    Submit
                  </button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Form>

      <div className="col-4 mt-5">
        <h4>We are here</h4>
        <img
          style={{ width: "400px", height: "500px" }}
          src="https://noticias.unsam.edu.ar/wp-content/uploads/2021/10/Seccion-mapa-Montevideo-1070x622.jpg"
          alt=""
        />
      </div>
    </div>
  );
};
