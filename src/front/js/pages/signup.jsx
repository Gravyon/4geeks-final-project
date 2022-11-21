import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const SignUp = () => {
  const { actions } = useContext(Context);
  let navigate = useNavigate();
  // Yup para validar campos
  const SignupSchema = Yup.object().shape({
    username: Yup.string("Enter your username")
      .min(2, "Username should be of minimum 8 characters length")
      .max(30, "Too Long!")
      .required("Username required"),
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email required"),
    password: Yup.string("Enter your password")
      .min(2, "Password should be of minimum 8 characters length")
      .max(50, "Too Long!")
      .required("Password required"),
  });
  return (
    <Formik
      //Valores iniciales
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={SignupSchema}
      // Declara onSubmit y se le pasan los valores de cada campo, anotandolos con values
      onSubmit={async (values) => {
        let onSignUp = await actions.signup(
          values.username,
          values.email,
          values.password
        );
        if (onSignUp === "User exists") {
          swal("User email already exists, redirecting to login");
          navigate("/login");
        } else if (onSignUp === "New user created") {
          navigate("/");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
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

                    <div className="col-12 ">
                      <Field
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control"
                      />
                      {errors.username && touched.username && errors.username}
                      <label
                        className="form-label"
                        htmlFor="form1Example2"
                      ></label>
                    </div>
                    <div className="col-12 ">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                      />
                      {errors.email && touched.email && errors.email}
                      <label
                        className="form-label"
                        htmlFor="form1Example2"
                      ></label>
                    </div>
                    <div className="col-12 ">
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                      />
                      {errors.password && touched.password && errors.password}
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
        </Form>
      )}
    </Formik>
  );
};
