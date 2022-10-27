import PropTypes from "prop-types";
import React, {useState, useEffect, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import {Context} from "../store/appContext";

import "../../styles/home.css";

import {LandingPage} from "../component/landing-page.jsx";

export const Home = () => {
    const {store, actions} = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getProduct(params.id);
    }, []);

    return (<div className="container text-center mt-5 d-flex">
        <LandingPage/>
    </div>);
};
