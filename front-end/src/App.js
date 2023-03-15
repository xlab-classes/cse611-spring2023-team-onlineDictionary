import logo from "./logo.svg";
import { useState, useRef } from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";

function App() {
  const [showWord, setShowWord] = useState(false);
  const [wordData,setWordData] = useState({});
  
  async function  wordHandler(word) {
    console.log("in app.js");
    
    await fetch(`http://localhost:3001/mongo/${word}`)
      .then((response) => response.json())
      .then((result) => setWordData(JSON.parse(result['body'])))
      .catch((error) => console.log("error", error));
    
    setShowWord(true);
  }

  function disableWord (){
    setShowWord(false);
  }
  

  return (
    <Fragment>
      <Header wordHandle={wordHandler} wordDisable={disableWord} />
      <main>{showWord && <Word wordData={wordData}/>}</main>
    </Fragment>
  );
}

export default App;
