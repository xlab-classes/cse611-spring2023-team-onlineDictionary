import classes from "./WordSummary.module.css";
import speakerLogo from "../../../assets/Icons/speaker.png";

const WordSummary = (props) => {

  const playAudio = () => {
    const timestamp = new Date().getTime();
    const audio = new Audio(
      `https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/mongo/audio/${props.word}?t=${timestamp}`
    );
    audio.play();
  };

  return (
    <li className={classes.meal}>
      <div className={classes.mealHeader}>
        <h1 className={classes.word}>{props.word}</h1>
        <button onClick={playAudio} className={classes.audioPlayer}>
          <img src={speakerLogo} alt="Speaker Logo" />
        </button>
        </div>
    </li>
  );
};

export default WordSummary;