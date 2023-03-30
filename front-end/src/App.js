import logo from "./logo.svg";
import { useState, useRef } from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import WordNotFound from "./components/Words/WordNotFound";

import InfoCard from "./components/InfoCard/InfoCard";
import MainInfoCard from "./components/MainInfoCard/MainInfoCard";


function App() {
  const [showWord, setShowWord] = useState(0);
  const [wordData,setWordData] = useState({});
  
  async function  wordHandler(word) {
    console.log("in app.js");
    
    await fetch(`http://localhost:3001/${word}`)
      .then((response) => response.json())
      .then((result) => {setWordData(result);setShowWord(1)})
      .catch((error) => setShowWord(2));
      console.log(wordData);
  }

  function disableWord (){
    setShowWord(0);
  }
  

  return (
    <Fragment>
      <Header wordHandle={wordHandler} wordDisable={disableWord} />
      <main>
        {showWord==1 && <Word wordData={wordData}/>}
        {showWord==0 && <MainInfoCard/>}
        {showWord==2 && <WordNotFound/>}
      </main>
    </Fragment>
  );
}

export default App;
