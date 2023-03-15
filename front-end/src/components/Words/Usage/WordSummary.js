import classes from "./WordSummary.module.css";
import speakerLogo from "../../Icons/speaker.png";

const WordSummary = (props) => {
  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.word}</h1>
        <button className={classes.speakerButton}>
          <img src={speakerLogo} alt="Speaker Logo" />
        </button>
      </div>
    </li>
  );
};

export default WordSummary;