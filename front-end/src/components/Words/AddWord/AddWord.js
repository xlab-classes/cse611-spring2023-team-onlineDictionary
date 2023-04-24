import React, { Fragment, useState } from "react";

import Modal from "../../UI/Modal";
import classes from "./AddWord.module.css";

const AddWord = (props) => {
  const [addWord, setAddWord] = useState(true);

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
 const clickHandler = () =>{
  setAddWord(!addWord);
 } 

  const addWordForm = (
    <div>
      <h1 className={classes.h1}>Help Us In Increasing Our Vocabulary</h1>
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

  const wordAddedForm = (
    <div className = {classes.addedWord}>
      <h1>Word has been sent for review.</h1> 
      <h1>Please click here if you want to add any other word.</h1>
      <button className = {classes.addWordButton} onClick={clickHandler}>ADD WORD</button>
    </div>
  );

  return (
    <div className={classes.card}>
      {addWord && addWordForm}
      {!addWord && wordAddedForm}
    </div>
  );
};

export default AddWord;
