import classes from "./WordNotFound.module.css";
import Card from "../UI/Card";

const WordNotFound = (props) => {
  return (
    <div className={classes.container}>
      <Card>
        <h1>No results found</h1>
        <button>Add a Word</button>
      </Card>
    </div>
  );
};

export default WordNotFound;