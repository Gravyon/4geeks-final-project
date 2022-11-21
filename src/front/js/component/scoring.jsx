import React, { useState, useContext} from "react";
import { Context } from "../store/appContext";
import {  useParams } from "react-router-dom";
import "../../styles/scoring.css";
import Swal from "sweetalert2";

export const Scoring = (props) => {
  const [score, setScore] = useState(null);
  const [comment, setComment] = useState("");

  const params = useParams();

  const { store, actions } = useContext(Context);

  const handleScore = async (e) => {
    e.preventDefault();
    let onScored = await actions.createScore(comment, score, params.id);
    Swal.fire(onScored.data.msg);
    setComment("");
  };

  return (
    <form onSubmit={handleScore} className="bg-dark">
      <h4 style={{ color: "white", textAlign: "center" }}>Review product</h4>
      <div className="container d-xl-inline-flex d-lg-inline-flex justify-content-between bg-dark">
        <div className="col-sm-12 col-md-12 col-lg-2">
          <p className="clasificacion" id="pClasification">
            <input
              id="radio1"
              type="radio"
              name="estrellas"
              value="5"
              onClick={(e) => setScore(parseInt(e.target.value))}
            />
            <label htmlFor="radio1">★</label>
            <input
              id="radio2"
              type="radio"
              name="estrellas"
              value="4"
              onClick={(e) => setScore(parseInt(e.target.value))}
            />
            <label htmlFor="radio2">★</label>
            <input
              id="radio3"
              type="radio"
              name="estrellas"
              value="3"
              onClick={(e) => setScore(parseInt(e.target.value))}
            />
            <label htmlFor="radio3">★</label>
            <input
              id="radio4"
              type="radio"
              name="estrellas"
              value="2"
              onClick={(e) => setScore(parseInt(e.target.value))}
            />
            <label htmlFor="radio4">★</label>
            <input
              id="radio5"
              type="radio"
              name="estrellas"
              value="1"
              onClick={(e) => setScore(parseInt(e.target.value))}
            />
            <label htmlFor="radio5">★</label>
          </p>
        </div>
        <div className="col-sm-12 col-md-12 col-md-4 col-lg-8" id="divTextarea">
          <textarea
            name="comments"
            id="comments"
            cols="50"
            rows="2"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
        </div>
        <div
          className="col-sm-12 col-md-12 col-lg-2 mt-sm-2 mt-md-0 mt-lg-0"
          id="buttonSubmit"
        >
          <button className="btn btn-outline-light" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
