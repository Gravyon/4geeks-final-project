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

    if (onSignUp === "User email already exists") {
      swal("User email already exists, redirecting to login")
      navigate("/login");
    }
    else if (onSignUp === "New user created") {
      // console.log(onSignUp.msg)
      navigate("/");
      setEmail("");
      setPassword("");
      setUsername("");

    }

  };

  return (
<Form onSubmit={doSubmit}>
<MDBContainer fluid>

  <MDBRow className='d-flex justify-content-center align-items-center h-100'>

    <MDBCol col='12'>

      <MDBCard className='bg-dark text-white my-5 mx-auto' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)', borderRadius: '1rem', maxWidth: '600px'}}>
        <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

          <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
          <div>
            <p className="mt-3 mb-3">Already registered? <Link to="/login" className="text-white-50 fw-bold">Login</Link></p>

          </div>
          {/* <p className="text-white-50 mb-5"> </p> */}
          <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='text' size="lg"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          invalid= {MDBInput.invalid}
          validation= "Please provide your username"
          />

          <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' type='email' size="lg"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          invalid= {MDBInput.invalid}
          validation= "Please provide your email"
          />
          <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          invalid= {MDBInput.invalid}
          validation= "Please provide your password"
          
          />
          
          <button  type="submit "className="btn btn-outline-light btn-lg mx-2 px-5" color="white" >Sign Up</button>

          <div className='d-flex flex-row mt-3 mb-5'>
          </div>

        </MDBCardBody>
      </MDBCard>

    </MDBCol>

  </MDBRow>
</MDBContainer>

</Form>

  );
};
