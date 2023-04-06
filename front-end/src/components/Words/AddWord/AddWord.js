import React from "react";

import Modal from "../../UI/Modal";
import classes from "./AddWord.module.css";

const AddWord = (props) => {
  function addWordHandler() {}

  const addWordForm = (
    <div>
        <h1 className={classes.h1}>Help us in increasing our Vocabulary</h1>
      <form className={classes.form} onSubmit={addWordHandler}>
        <input
          className={classes.input}
          type="text"
          name="word"
          placeholder={"Add a New Word"}
        />
        <button className={classes.button}>Submit</button>
      </form>
    </div>
  );

  return <Modal onClose={props.onClose}>{addWordForm}</Modal>;
};

export default AddWord;
