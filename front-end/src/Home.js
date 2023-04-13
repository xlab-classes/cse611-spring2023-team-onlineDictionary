import { useState} from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import WordNotFound from "./components/Words/WordNotFound";
import AddWord from "./components/Words/AddWord/AddWord";
import Statistics from "./components/Words/Statistics/Statistics";

import InfoCard from "./components/InfoCard/InfoCard";
import MainInfoCard from "./components/MainInfoCard/MainInfoCard";

function App() {
  const [showWord, setShowWord] = useState(0);
  const [wordData,setWordData] = useState({});

  const [addWordHandler, setWordHandler] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [languageCode, setLanguageCode] = useState('en-US');

  var langcode;
  function handleLanguageChange(code) {
    setLanguageCode(code);
  }

  async function  wordHandler(word) {
    console.log("in app.js");
    console.log("language code is : ",languageCode)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: word , languageCode: languageCode })
  };
    await fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/`,requestOptions)
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

  const showStatistics = () => {
    setStatistics(true);
  };

  const hideStatistics = () => {
    setStatistics(false);
  };

  function getDate()
  {
    const currentDate = new Date().toLocaleDateString();
  }
  
  const [readMore,setReadMore] =useState(false);
  

  return (
    <Fragment>
      {addWordHandler && <AddWord onClose={hideWordHandler} />}
      {statistics && <Statistics onClose={hideStatistics} />}
      <Header onStatistics={showStatistics} onAddWord={showWordHandler} wordHandle={wordHandler} wordDisable={disableWord} languageCode={languageCode} onLanguageChange={handleLanguageChange} />
      <main>
        {showWord==0 && <MainInfoCard showWord={wordHandler}/>}
        {showWord==1 && <Word wordData={wordData} />}
        {showWord==2 && <WordNotFound onAddWord={showWordHandler}/>}
      </main>
    </Fragment>
  );
}
// changes added
export default App;