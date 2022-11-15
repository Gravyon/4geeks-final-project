import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../../styles/login.css";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { FcGoogle } from 'react-icons/fc';

export const Login = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email required"),
    password: Yup.string("Enter your password")
      .min(2, "Password should be of minimum 8 characters length")
      .max(50, "Too Long!")
      .required("Password required"),
  });

  const responseGoogle = (response) => {
    //console.log(response);
     const userObject = jwt_decode(response.credential);
     //console.log(userObject);
     localStorage.setItem('user', JSON.stringify(userObject));
     const { name, sub, picture, email, jti, iat, exp } = userObject;
     const doc = {
       _id: sub,
       _type: 'user',
       userName: name,
       image: picture,
       email: email,
       jti: jti,
       iat: iat,
       exp: exp
     };
    console.log(doc)
    //  client.createIfNotExists(doc).then(() => {
    //    navigate('/', { replace: true });
    //  });
    }

  return (
    <Formik
      //Valores iniciales
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      // Declara onSubmit y se le pasan los valores del login dentro, anotandolos con values
      onSubmit={async (values) => {
        let onLogged = await actions.login(values.email, values.password);
        if (onLogged === "User doesn't exist") {
          navigate("/signup");
        } else if (onLogged.msg === "Bad email or password") {
          navigate("/login");
        } else {
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
                      Login
                    </h2>
                    <p className="text-white-50">
                      Please enter your login and password
                    </p>
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
                        name="password"
                        type="password"
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
                      type="submit"
                      // disabled={isSubmitting}
                      className="btn btn-outline-light btn-lg mx-2 px-5"
                      style={{ color: "#bdb284" }}
                      color="white"
                    >
                      Login
                    </button>
                    <div className="d-flex flex-row mt-3 mb-5">
                      <GoogleOAuthProvider
                        clientId={`${process.env.GOOGLE_AUTH}`}
                      >
                        <GoogleLogin
                          render={(renderProps) => (
                            <button
                              type="button"
                              className=""
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                            >
                              <FcGoogle className="" /> Sign in with google
                            </button>
                          )}
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy="single_host_origin"
                        />
                      </GoogleOAuthProvider>
                    </div>
                    <div>
                      <p className="mb-0" style={{ color: "#bdb284" }}>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-white-50 fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
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
