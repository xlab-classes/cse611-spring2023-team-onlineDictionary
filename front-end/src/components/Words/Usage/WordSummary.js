import classes from "./WordSummary.module.css";
import speakerLogo from "../../Icons/speaker.png";

const WordSummary = (props) => {
  
  
  
  async function playSound(){

    await fetch(`http://localhost:3001/mongo/audio/${props.word}`)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // var snd = new Audio(props.audio[0])
    // snd.play()
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