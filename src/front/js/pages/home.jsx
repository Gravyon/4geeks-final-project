import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { LandingPage } from "../component/landing-page.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <LandingPage />
    </div>
  );
};
