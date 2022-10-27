import React from "react";
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { ProductDetail } from "./pages/details.jsx";
import { Login } from "./pages/login.jsx";
import { SignUp } from "./pages/signup.jsx";

import { NavbarPrincipal } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
=======
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import {Home} from "./pages/home.jsx";
import {Demo} from "./pages/demo";
import {Single} from "./pages/single";
import injectContext from "./store/appContext";
import {ProductDetail} from "./pages/details.jsx";
import {Login} from "./pages/login.jsx";
import {SignUp} from "./pages/signup.jsx";

import {NavbarPrincipal} from "./component/navbar.jsx";
import {Footer} from "./component/footer.jsx";
>>>>>>> 5489a4325f35e6dd8b72cc7f65344e3d70f32e06

// create your first component
const Layout = () => {
<<<<<<< HEAD
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <NavbarPrincipal />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<ProductDetail />} path="/product-detail/:id" />
            <Route element={<h1> Not found! </h1>} />
          </Routes>{" "}
          <Footer />
        </ScrollToTop>{" "}
      </BrowserRouter>{" "}
    </div>
  );
=======
    // the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (<div> {" "}
        <BrowserRouter basename={basename}> {" "}
            <ScrollToTop> {" "}
                <NavbarPrincipal/>{" "}
                <Routes> {" "}
                    <Route element={<Home/>}
                        path="/"/>{" "}
                    <Route element={<Login/>}
                        path="/login"/>{" "}
                    <Route element={<SignUp/>}
                        path="/signup"/>{" "}
                    <Route element={<Demo/>}
                        path="/demo"/>{" "}
                    <Route element={<Single/>}
                        path="/single/:theid"/>{" "}
                    <Route element={<ProductDetail/>}
                        path="/product-detail/:id"/>{" "}
                    <Route element={
                        <h1>Not found !</h1>
                    }/>{" "} </Routes>
                {" "}
                <Footer/>{" "} </ScrollToTop>
            {" "} </BrowserRouter>
        {" "} </div>);
>>>>>>> 5489a4325f35e6dd8b72cc7f65344e3d70f32e06
};

export default injectContext(Layout);
