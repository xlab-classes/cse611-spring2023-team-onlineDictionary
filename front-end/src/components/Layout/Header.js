import { Fragment } from "react";
import classes from "./Header.module.css";

const Header = (props) => {

  function onSubmitHandler (event) {
    event.preventDefault();
    props.wordHandle();
    console.log(event.target.elements.word.value);
  };   
  
  return (
    <Fragment>
      <header className={classes.header}>
        <form onSubmit={onSubmitHandler}>
          <input type="text" name='word' placeholder={"Search For a Word"} ></input>
          <button>submit</button>
        </form>
      </header>
    </Fragment>
  );
};

export default Header;
