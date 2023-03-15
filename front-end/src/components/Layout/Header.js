import { Fragment, useState } from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  const [isSearching, setIsSearching] = useState(false);

  function onSubmitHandler(event) {
    event.preventDefault();
    props.wordHandle(event.target.elements.word.value);
    console.log(event.target.elements.word.value);
  };
  
  function disableSearch(){
    //  props.wordDisable();
  }
  
  function onInputChangeHandler(event) {
    if (event.target.value) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }

  return (
    <Fragment>
      <header className={`${classes.header} ${isSearching && classes.headerSearching}`}>
        <div className={classes.title}>
          <h1>Online Dictionary</h1>
        </div>
        <form onSubmit={onSubmitHandler}>
          <input type="text" name="word" placeholder={"Search For a Word"} onChange={onInputChangeHandler} />
          <button>Submit</button>
        </form>
      </header>
    </Fragment>
  );
};

export default Header;