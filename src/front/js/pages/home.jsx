import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.css";

import { LandingPage } from "../component/landing-page.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getProduct(params.id);
  }, []);

  return (
    <div className="vh-auto vh-100 p-3">
      <div className="jumbotron jumbotron-fluid mb-3 mt-5 text-align-center">
        <div className="container text-align-center">
          <h1 className="display-4 text-align-center">Check out these amazing pieces of art!</h1>
        </div>
      </div>
      <div className="container text-center">
        <LandingPage />
      </div>
    </div>
  );
};
