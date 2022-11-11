import React, { useState, useEffect, useContext } from "react";
import ReactDOM, { render } from "react-dom";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const AverageScore = (props) => {
  const { actions, store } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getProductRatings(params.id);
  }, []);

  return (
    <div>
      <p>Score total: {store.avgScore}</p>
    </div>
  );
};
