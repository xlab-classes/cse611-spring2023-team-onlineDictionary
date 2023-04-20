import classes from "./WordSummary.module.css";
import speakerLogo from "../../../assets/Icons/speaker.png";
import { useState, useEffect, useRef } from "react";


const WordSummary = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.languageCode || 'en-US');

  useEffect(() => {
    setSelectedValue(props.languageCode);
  }, [props.languageCode]);

  function handleSelectChange(event){
    setSelectedValue(event.target.value);
    props.onLanguageChange(event.target.value);
    }
    console.log(selectedValue);

  const playAudio = () => {
    const timestamp = new Date().getTime();
    const audio = new Audio(
      `https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/mongo/audio/${props.word}?t=${timestamp}&lang=${selectedValue}`
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
        <div style={{ position: 'absolute', top: '15px', right: '10px' }} className={classes.dropdown}>
        <select value={selectedValue} onChange={handleSelectChange} className={classes.languageSelect}>
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