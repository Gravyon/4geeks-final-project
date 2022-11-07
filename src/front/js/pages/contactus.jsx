import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, ValidationError } from "@formspree/react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

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
    <div className="container text-center mt-5 d-flex justify-content-between vh-100">
      <div className="col-4">
        <MDBBtn
          tag="a"
          color="none"
          className="m-1"
          style={{ color: "#dd4b39" }}
        >
          <MDBIcon fab icon="google" size="lg" />
        </MDBBtn>
        <h5 className="pb-5">example@domain.com</h5>

        <i className="fa-solid fa-location-dot"></i>

        <h5 className="pb-5">
          Av. de las leyes 1234 <br />
          Montevideo-Uruguay
          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#3b5998" }}
          >
            <MDBIcon fab icon="whatsapp" size="lg" />
          </MDBBtn>
        </h5>
        <h5 className="pb-5">+598 2 111 1111</h5>
        <MDBBtn
          tag="a"
          color="none"
          className="m-1"
          style={{ color: "#3b5998" }}
        >
          <MDBIcon fab icon="facebook-f" size="lg" />
        </MDBBtn>
        <h5 className="pb-5">@yourfbprofile</h5>
        <MDBBtn
          tag="a"
          color="none"
          className="m-1"
          style={{ color: "#ac2bac" }}
        >
          <MDBIcon fab icon="instagram" size="lg" />
        </MDBBtn>
        <h5>@yourigprofile</h5>
      </div>

      <div className="col-4">
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label opacity-50 mx-2"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            >
              First Name
            </label>
            <br />
            <input
              className="mb-3"
              id="firstName"
              type="text"
              name="firstName"
              required
            />
            <ValidationError
              prefix="FirstName"
              field="firstName"
              errors={state.errors}
            />
          </div>
          <div className="col-12">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label opacity-50 mx-2"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            >
              Last Name
            </label>
            <br />
            <input className="mb-3" id="lastName" type="text" name="lastName" />
            <ValidationError
              prefix="LastName"
              field="lastName"
              errors={state.errors}
              required
            />
          </div>
          <div className="col-12">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label opacity-50 mx-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            >
              Email address
            </label>
            <br />
            <input className="mb-3" id="email" type="email" name="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              required
            />
          </div>
          <div className="col-12">
            <textarea id="message" name="message" />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            style={{ color: "#bdb284" }}
            disabled={state.submitting}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="col-4">
        <h4>We are here</h4>
        <img
          style={{ width: "300px", height: "300px" }}
          src="https://thumbs.dreamstime.com/z/mapa-geogr%C3%A1fico-de-uruguay-con-el-capital-de-montevideo-98137776.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

// COMO EJEMPLO PARA LOS CLASSNAMES Y ESTILOS
// <div className="mb-3">
//         <label
//           htmlFor="exampleInputPassword1"
//           className="form-label opacity-50"
//         >
//           Last Name
//         </label>
//
// <ValidationError
//   prefix="LastName"
//   field="lastName"
//   errors={state.errors}
// />
//       </div>

//       <Form.Group className="mb-3" controlId="formBasicCheckbox">
//         <Form.Check type="checkbox" label="I am not a robot reCapcha" />
//       </Form.Group>
