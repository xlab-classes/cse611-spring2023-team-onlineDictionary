import classes from "./WordNotFound.module.css";
import Card from "../UI/Card";
import { Fragment } from "react";
import { useState } from "react";

const WordNotFound = (props) => {
  const [addWord, setAddWord] = useState(true);

   async function onClickHandler(){
    
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: props.wordSearched,
          languageCode: "en-US",
        }),
      };
  
      fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getWord/addNewWord`,
        requestOptions)
       
     
    
    setAddWord(!addWord);
  }

  const clickHandler = () =>{
    props.onAddWord();
   } 


  const wordNfound = (
    <div className={classes.container}>
      <Card>
        <h1>We cannot find the word {props.wordSearched}.</h1>
        <button className={classes.button} onClick={onClickHandler }>Click here to add this word</button>
      </Card>
    </div>
  );

  const wordAddedForm = (<div><h1>Word has been added to Queue. Please click here if you want to add any other Word.</h1>
  <button onClick={clickHandler}>ADD WORD</button>
  </div>);
  

  return (<Fragment>
    {addWord && wordNfound}
    {!addWord &&  wordAddedForm}

  </Fragment>)
};

export default WordNotFound;