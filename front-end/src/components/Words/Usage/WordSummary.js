import { useState } from "react";
import classes from "./WordSummary.module.css";
import speakerLogo from "../../../assets/Icons/speaker.png";

const WordSummary = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");

  const playAudio = () => {
    const timestamp = new Date().getTime();
    const audio = new Audio(
      `http://localhost:3001/mongo/audio/${props.word}?t=${timestamp}&lang=${selectedLanguage}`
    );
    audio.play();
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <li className={classes.meal}>
      <div className={classes.mealHeader}>
        <h1 className={classes.word}>{props.word}</h1>
        <button onClick={playAudio} className={classes.audioPlayer}>
          <img src={speakerLogo} alt="Speaker Logo" />
        </button>
        <div className={classes.dropdown}>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className={classes.languageSelect}
          >
            <option value="en-US">en-US</option>
            <option value="hi-IN">hi-IN</option>
            <option value="es-ES">es-ES</option>
            <option value="ja-JP">ja-JP</option>
            <option value="da-DK">da-DK</option>
          </select>
        </div>
      </div>
    </li>
  );
};

export default WordSummary;