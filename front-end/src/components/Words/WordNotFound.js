import classes from "./WordNotFound.module.css";
import Card from "../UI/Card";

const WordNotFound = (props) => {
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <h1>No results found.</h1>
        <p>We are constantly upgrading and adding new words.
          Check us out later for an updated list.</p>
      </Card>
    </div>
  );
};

export default WordNotFound;