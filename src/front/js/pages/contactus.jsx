import React from "react";
import { useForm} from "@formspree/react";
import Iframe from "react-iframe";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export const ContactUs = () => {

  const SignupSchema = Yup.object().shape({
    fname: Yup.string('Enter your name')
    .max(50, "Too Long!")
    .min(2, 'Too short')
    .required("A name is required"),
    lname: Yup.string()
    .min(2, 'Too short')
    .max(50, "Too Long!"),
    email: Yup.string('Enter your email')
      .email('Enter a valid email')
      .required("Email required"),
    message: Yup.string()
    .min(2, 'Too short')
    .max(250, "Too Long!")
    .required("Please leave your feedback"),
  });

// const contactForm = (values) => {
//   const [state] = useForm(process.env.CONTACT_FORM);
//   if (state.succeeded) {
//     return (
//       <h1 className="position-relative position-absolute top-50 start-50 translate-middle">
//         Thanks for your feedback!
//       </h1>
//     );
//   }
// }

  return (
    <Formik
    initialValues={{ email: "", fname: "", lname:"", message:"" }}
    validationSchema={SignupSchema}
    onSubmit={(values) => {
      values.email
      values.fname
      values.lname
      values.message
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        // setSubmitting(false);
      }, 400);
      const [state] = useForm(process.env.CONTACT_FORM);
      if (state.succeeded) {
        return (
          <h1 className="position-relative position-absolute top-50 start-50 translate-middle">
            Thanks for your feedback!
          </h1>
        );
      }
    }}
    >
    {({ errors, touched}) => (
    <Form>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-3">
            <div
              className="card bg-dark text-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "900px" }}
              >
              <div className="card-body p-5 d-flex flex-column align-items-center mx-auto w-100">
                <h2 className="fw-bold mb-2 text-uppercase" style={{ color: "#bdb284" }}>Contact Us</h2>
                <p className="text-white-50">
                  Please enter your info and we will contact you
                </p>
                <div className="col-12 p-3">
                  <Field
                    className="form-control"
                    name="fname"
                    type="text"
                    placeholder="First Name"
                    />
                    {errors.fname && touched.fname && errors.fname}
                </div>
                <div className="col-12 p-3">
                  <Field
                    name="lname"
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                  />
                  {errors.lname && touched.lname && errors.lname}
                </div>
                <div className="col-12 p-3">
                  <Field
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Email Address"
                    />
                    {errors.email && touched.email && errors.email}
                </div>
                <div className="col-12 form-group shadow-textarea p-3">
                  <Field
                    className="form-control z-depth-1"
                    type="text"
                    component="textarea"
                    name="message"
                    rows="3"
                    placeholder="Write something here..."
                  />
                  {errors.message && touched.message && errors.message}
                  <br />
                </div>
                <button
                  type="submit"
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
    </Form>
    )}
</Formik>
  );
};
