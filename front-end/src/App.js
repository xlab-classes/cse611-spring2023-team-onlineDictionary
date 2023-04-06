import logo from "./logo.svg";
import { useState, useRef } from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import WordNotFound from "./components/Words/WordNotFound";
import AddWord from "./components/Words/AddWord/AddWord";

function App() {
  const [showWord, setShowWord] = useState(0);
  const [wordData,setWordData] = useState({});
  const [addWordHandler, setWordHandler] = useState(true);


  
  async function  wordHandler(word) {
    console.log("in app.js");
    
    await fetch(`http://localhost:3001/${word}`)
      .then((response) => response.json())
      .then((result) => {setWordData(result);setShowWord(1)})
      .catch((error) => setShowWord(2));

      // setShowWord(1);


      console.log(wordData);
  
    
     
  }

  function disableWord (){
    setShowWord(0);
  }
  const showWordHandler = () => {
    setWordHandler(true);
  };

  const hideWordHandler = () => {
    setWordHandler(false);
  };
  

  return (
    <Fragment>
      {addWordHandler && <AddWord onClose={hideWordHandler} />}
      <Header wordHandle={wordHandler} wordDisable={disableWord} />
      <main>{showWord==1 && <Word wordData={wordData}/>}
      {showWord==2 && <WordNotFound/>}
      </main>
    </Fragment>
  );
}

export default App;
