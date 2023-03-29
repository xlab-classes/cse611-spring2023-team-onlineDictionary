import classes from "./WordSummary.module.css";
import React from "react";
const WordSummary = (props) => {
  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.word}</h1>
      </div>
    </li>
  );
};

export default WordSummary;
