import classes from "./WordNotFound.module.css";
import Card from "../UI/Card";

const WordNotFound = (props) => {

  function onClickHandler(){
    props.onAddWord();
  }
  return (
    <div className={classes.container}>
      <Card>
        <h1>No results found</h1>
        <button onClick={onClickHandler}>Add a Word</button>
      </Card>
    </div>
  );
};

export default WordNotFound;