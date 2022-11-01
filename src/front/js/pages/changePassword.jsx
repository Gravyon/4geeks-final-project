import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

export const ChangePassword = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");
  //   let navigate = useNavigate();

  //   const doSubmit = (e) => {
  //     e.preventDefault();
  //     let onLogged = actions.login(email);
  //     setEmail("");
  //     onLogged ? navigate("/") : null;
  //   };

  return (
    <div>
      <h1>Reset password</h1>
      <div className="text-center mt-5 container vh-100">
        <form
        // onSubmit={doSubmit}
        >
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
          <div class="d-flex justify-content-between">
            <Link to={"/"}>
              <button type="button" className="btn btn-dark text-warning">
                Back
              </button>
            </Link>
            <button type="submit" className="btn btn-dark text-warning">
              Send password to email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
