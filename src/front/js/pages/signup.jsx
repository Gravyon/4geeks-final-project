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
      swal("User email already exists, redirecting to login");
      navigate("/login");
    } else if (onSignUp === "New user created") {
      navigate("/");
    }
  };

  return (
    <form onSubmit={doSubmit}>
      <div className="container-fluid text-center">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div col="12">
            <div
              className="bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "400px" }}
            >
              <div className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2
                  className="fw-bold mb-2 text-uppercase"
                  style={{ color: "#bdb284" }}
                >
                  Register
                </h2>
                <p className="mt-3 mb-3" style={{ color: "#bdb284" }}>
                  Already registered?{" "}
                  <Link to="/login" className="text-white-50 fw-bold">
                    Login
                  </Link>
                </p>
                <p></p>
                <div className="col-12 ">
                  <input
                    type="text"
                    id="email"
                    placeholder="Username"
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                  <label className="form-label" htmlFor="form1Example2"></label>
                </div>
                <div className="col-12 ">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label className="form-label" htmlFor="form1Example2"></label>
                </div>
                <div className="col-12 ">
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <p className="small mb-3 pb-lg-2">
                  <br />
                  <Link className="text-white-50" to={"/changePassword"}>
                    Forgot password?
                  </Link>
                </p>

                <button
                  type="submit "
                  className="btn btn-outline-light btn-lg mx-2 px-5"
                  style={{ color: "#bdb284" }}
                  color="white"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
