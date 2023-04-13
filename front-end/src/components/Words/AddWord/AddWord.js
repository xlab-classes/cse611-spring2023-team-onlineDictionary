import React, { useState } from "react";

import Modal from "../../UI/Modal";
import classes from "./AddWord.module.css";

const AddWord = (props) => {
  const [addWord, setAddWord] = useState(false);

  async function addWordHandler(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word: event.target.elements.word.value,
        languageCode: "en-US",
      }),
    };

    fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getWord/addNewWord`,
      requestOptions)
     
    setAddWord(!addWord);
  }

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
