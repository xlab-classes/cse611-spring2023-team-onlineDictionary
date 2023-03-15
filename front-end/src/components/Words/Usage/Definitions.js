import classes from "./Definitions.module.css";

const Definitions = (props) => {
  const defList = props.item.slice(0,10).map((item) => <li>{item}</li>);
  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.name}</h1>
        <ul>{defList}</ul>
      </div>
    </li>
  );
};

export default Definitions;
