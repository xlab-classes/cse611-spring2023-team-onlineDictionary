import classes from "./Pos.module.css";

const Pos = (props) => {
  const defList = props.item.map((item) => <li>{item}</li>);
  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.name}</h1>
        <ul>{defList}</ul>
      </div>
    </li>
  );
};

export default Pos;
