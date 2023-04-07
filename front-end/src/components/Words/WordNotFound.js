import classes from "./WordNotFound.module.css";
import Card from "../UI/Card";

const WordNotFound = (props) => {

  function onClickHandler(){
    props.onAddWord();
  }
  return (
    <div className={classes.container}>
      <Card>
        <h1>The word you entered is not in our dictionary.</h1>
        <button className={classes.button} onClick={onClickHandler}>Click here to add this word</button>
      </Card>
    </div>
  );
};

export default WordNotFound;