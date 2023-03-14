import classes from "./WordSummary.module.css";

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
