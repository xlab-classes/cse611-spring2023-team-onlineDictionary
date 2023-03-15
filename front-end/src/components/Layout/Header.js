import { Fragment } from "react";
import classes from "./Header.module.css";

const Header = (props) => {

  function onSubmitHandler (event) {
    event.preventDefault();
    props.wordHandle(event.target.elements.word.value);
    console.log(event.target.elements.word.value);
  };
  
  function disableSearch(){
    //  props.wordDisable();
  }
  
  return (
    <Fragment>
      <header className={classes.header} onClick={disableSearch}>
        <form onSubmit={onSubmitHandler}>
          <input type="text" name='word' placeholder={"Search For a Word"} ></input>
          <button>submit</button>
        </form>
      </header>
    </Fragment>
  );
};

export default Header;
