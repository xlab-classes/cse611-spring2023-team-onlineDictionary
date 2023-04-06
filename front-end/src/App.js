import { useState} from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import WordNotFound from "./components/Words/WordNotFound";
import AddWord from "./components/Words/AddWord/AddWord";

import InfoCard from "./components/InfoCard/InfoCard";
import MainInfoCard from "./components/MainInfoCard/MainInfoCard";


import InfoCard from "./components/InfoCard/InfoCard";
import MainInfoCard from "./components/MainInfoCard/MainInfoCard";


function App() {
  const [showWord, setShowWord] = useState(0);
  const [wordData,setWordData] = useState({});

  const [addWordHandler, setWordHandler] = useState(false);



  
  async function  wordHandler(word) {
    console.log("in app.js");
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: word , languageCode: 'en-US' })
  };

    await fetch(`http://localhost:3001/`,requestOptions)
      .then((response) => response.json())
      .then((result) => {setWordData(result);setShowWord(1)})
      .catch((error) => setShowWord(2));
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

  function getDate()
  {
    const currentDate = new Date().toLocaleDateString();
  }
  
  const [readMore,setReadMore] =useState(false);
  

  return (
    <Fragment>
      {addWordHandler && <AddWord onClose={hideWordHandler} />}
      <Header wordHandle={wordHandler} wordDisable={disableWord} />
      <main>
        {showWord==0 && <MainInfoCard showWord={wordHandler}/>}
        {showWord==1 && <Word wordData={wordData} />}
        {showWord==2 && <WordNotFound onAddWord={showWordHandler}/>}
      </main>
    </Fragment>
  );
}

export default App;
