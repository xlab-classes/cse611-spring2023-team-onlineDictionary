import classes from "./WordSummary.module.css";
import speakerLogo from "../../Icons/speaker.png";

const WordSummary = (props) => {
  console.log(props.audio[0]);
  
  function playSound(){
    var snd = new Audio(props.audio[0])
    snd.play()
  }

  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.word}</h1>
    
        <button className={classes.speakerButton} onClick={playSound}>
          <img src={speakerLogo} alt="Speaker Logo" />
        </button> 
    
      </div>
    </li>
  );
};

export default WordSummary;