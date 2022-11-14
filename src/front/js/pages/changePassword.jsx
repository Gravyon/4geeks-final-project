import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
export const ChangePassword = () => {
  const { store, actions } = useContext(Context);

  // const [email, setEmail] = useState("");
  let navigate = useNavigate();

  // const doSubmit = (e) => {
  //   e.preventDefault();
  //   let changePassword = actions.changePassword(email);
  //   setEmail("");
  //   changePassword ? navigate("/") : null;
  // };
  const SignupSchema = Yup.object().shape({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email required")
  });

  return (
    <Formik
      //Valores iniciales
      initialValues={{email: "" }}
      validationSchema={SignupSchema}
      // Declara onSubmit y se le pasan los valores del campo dentro, anotandolos con "values"
      onSubmit={ (values, {resetForm} ) => {
      // let changePassword = actions.changePassword(values.email);
      actions.changePassword(values.email);
      // if (changePassword === "Your password has been sent to your email") {
      //   return <div className="position-relative position-absolute top-50 start-50 translate-middle">
      //       <h1>Email sent</h1>
      //       <p className="mb-0" style={{ color: "#bdb284" }}>
      //         <Link to="/" className="text-white-50 fw-bold">
      //           Back home
      //         </Link>
      //       </p>
      //     </div>
      // }
      resetForm({values: ""})
    }
  }
    >
      {({ errors, touched }) => (
        <Form>
          <div className="container-fluid text-center d-flex">
            <div className="row  justify-content-center align-items-center h-100 w-100">
              <div col="12">
                <div
                  className="bg-dark text-white my-5 mx-auto"
                  style={{ borderRadius: "1rem", maxWidth: "600px" }}
                >
                  <div className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                    <h2
                      className="fw-bold mb-2 text-uppercase"
                      style={{ color: "#bdb284" }}
                    >
                      Reset password
                    </h2>
                    <p className="text-white-50">
                      Your new password will be sent to your email address
                    </p>
                    <div className="col-12 ">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                      />
                       {/* {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
                       {errors.email && touched.email && errors.email}
                      <label
                        className="form-label"
                        htmlFor="form1Example2"
                      ></label>
                    </div>
                  <div className="d-flex flex-row mt-3 mb-5">
                    <button
                      type="submit"                      
                      className="btn btn-outline-light btn-lg mx-2 px-5"
                      style={{ color: "#bdb284" }}
                      color="white"
                    >
                      Send password
                    </button>
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
