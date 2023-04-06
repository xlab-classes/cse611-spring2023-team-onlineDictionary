import classes from "./Pos.module.css";
import speakerLogo from "../../Icons/speaker.png";
const Pos = (props) => {
  console.log(props.data["definitions"]);
  const defList = props.data["definitions"].map((defintion) => (
    <div>
      <li>
        {defintion["meaning"]}
        <ol>{defintion["usage"]}</ol>
      </li>
    </div>
  ));

  var audioButton = null;

  async function playSound() {
    var snd = new Audio(props.data["audio"]["audioLink"]);
    snd.play(snd);
    console.log(props.data["audio"]);
  }

  if (props.data.hasOwnProperty("audio")) {
    audioButton = (
      <button className={classes.speakerButton} onClick={playSound}>
        <img src={speakerLogo} alt="Speaker Logo" />
      </button>
    );
  }

  return (
    <li className={classes.meal}>
      <div>
        <h1>
          {props.data["pos"]}
          <span className={classes.icon}>{audioButton}</span>
        </h1>
        <ul>{defList}</ul>
      </div>
    </li>
  );
};

export default Pos;
