import { useState } from "react";
import { Fragment } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import WordNotFound from "./components/Words/WordNotFound";
import AddWord from "./components/Words/AddWord/AddWord";
import Statistics from "./components/Words/Statistics/Statistics";

import InfoCard from "./components/InfoCard/InfoCard";
import MainInfoCard from "./components/MainInfoCard/MainInfoCard";

function Home() {
  const [showWord, setShowWord] = useState(0);
  const [wordData, setWordData] = useState({});
  const [searchedWord, setSearchedWord] = useState("");

  const [addWordHandler, setWordHandler] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [languageCode, setLanguageCode] = useState("en-US");

  function handleLanguageChange(code) {
    setLanguageCode(code);
  }

  async function wordHandler(word) {
    console.log("in Home.js");
    console.log("language code is : ", languageCode);
    let userDetails;
    await fetch("https://api.ipify.org?format=json")
      .then((res) =>   res.json())
      .then((data) => userDetails = data.ip);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: word, languageCode: languageCode ,userIP : userDetails}),
    };
    await fetch(
      `https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setWordData(result);
        setShowWord(1);
        setSearchedWord(word);
      })
      .catch((error) => {
        setShowWord(2);
        setSearchedWord(word);
      });
    console.log(wordData);
  }

  function disableWord() {
    setShowWord(0);
  }
  const showWordHandler = () => {
    setShowWord(3);
  };

  const hideWordHandler = () => {
    setWordHandler(false);
  };

  const showStatistics = () => {
    setShowWord(4);
  };

  const hideStatistics = () => {
    setStatistics(false);
  };

  function getDate() {
    const currentDate = new Date().toLocaleDateString();
  }

  const [readMore, setReadMore] = useState(false);

  return (
    <Fragment>
      
      
      <Header onStatistics={showStatistics} onAddWord={showWordHandler} wordHandle={wordHandler} wordDisable={disableWord} />
      <main>
        {showWord==0 && <MainInfoCard showWord={wordHandler}/>}
        {showWord==1 && <Word wordData={wordData} languageCode={languageCode} onLanguageChange={handleLanguageChange}/>}
        {showWord==2 && <WordNotFound onAddWord={showWordHandler} wordSearched={searchedWord}/>}
        {showWord==3  && <AddWord onClose={hideWordHandler} />}
        {showWord==4 && <Statistics onClose={hideStatistics} />}
      </main>
    </Fragment>
  );
}
// changes added
export default Home;
