import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/scoring.css";

export const Scoring = (props) => {
  const [score, setScore] = useState(null);
  const [comment, setComment] = useState("");

  const params = useParams();

  const { store, actions } = useContext(Context);

  const handleScore = async (e) => {
    e.preventDefault();
    let onScored = await actions.createScore(comment, score, params.id);
    // let msj = await actions.login(email, password).response.data.msg;
    console.log(onScored);

    // console.log(onLogged);
    // setScore(null);
    // setComment("");

    // if (onLogged === "User doesn't exist") {
    //   navigate("/signup");
    // } else if (onLogged.msg === "Bad email or password") {
    //   navigate("/login");
    // } else {
    //   navigate("/");
    // }
  };

  return (
    <form onSubmit={handleScore}>
      <p className="clasificacion">
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
      <textarea
        name="comments"
        id=""
        cols="30"
        rows="10"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <button class="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};
