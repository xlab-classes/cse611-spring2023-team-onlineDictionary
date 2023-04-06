import React, { useState } from "react";

import Modal from "../../UI/Modal";
import classes from "./AddWord.module.css";

const Statistics = (props) => {
    const [statistics, setStatistics] = useState(false);
async function callStatistics(event) {
await fetch(`http://localhost:3001/getWord/getStatistics`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
    setStatistics(result);
    console.log(result);
    })

    statistics = {};

}

callStatistics;


  

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

  return <Modal onClose={props.onClose}>{!addWord && addWordForm}
  {addWord && <h1>Your word has been sucessfully added to Queue</h1>}
  </Modal>;
};

export default AddWord;
