import classes from "./WordSummary.module.css";

const WordSummary = (props) => {
  console.log(props.audio[0]);
  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.word}</h1>
        <audio controls><source src={props.audio[0]} type="audio/mp3" /> </audio>
      </div>
    </li>
  );
};

export default WordSummary;
