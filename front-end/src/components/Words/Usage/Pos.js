import classes from "./Pos.module.css";
import speakerLogo from "../../../assets/Icons/speaker.png";

const Pos = (props) => {
  const defList = props.data["definitions"].map((definition,index) => (
    <div key={index}>
      <li>
        {definition["meaning"]}
        {definition["usage"] && (
            <ol> {definition["usage"]} </ol>
        )}
      </li>
    </div>
  ));

  let source = null;

  if (props.data["definitions"].length > 0) {
    const firstDefinition = props.data["definitions"][0];
    if (firstDefinition["source"]) {
      source = (
        <div className={classes.source + " " + classes.rightAlign}>Source: {firstDefinition["source"]}</div>
      );
    }
  }

  var audioButton = null;

  async function playSound() {
    var snd = new Audio(props.data["audio"]["audioLink"]);
    snd.play(snd);
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
        {source}
      </div>
    </li>
  );
};

export default Pos;
