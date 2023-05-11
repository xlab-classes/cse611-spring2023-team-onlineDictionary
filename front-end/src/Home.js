import { useState } from "react";
import { Fragment } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import WordNotFound from "./components/Words/WordNotFound";
import AddWord from "./components/Words/AddWord/AddWord";
import Statistics from "./components/Words/Statistics/Statistics";
import About from "./About";
import MainInfoCard from "./components/MainInfoCard/MainInfoCard";

function Home() {
  const [showWord, setShowWord] = useState(0);
  const [wordData, setWordData] = useState({});
  const [searchedWord, setSearchedWord] = useState("");

  const [setWordHandler] = useState(false);
  const [setStatistics] = useState(false);
  const [languageCode] = useState("en-US");

  async function handleLanguageChange(code) {
    await wordHandler(wordData.word,code);
  }

  async function wordHandler(word,lcode ="en-US") {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word: word, languageCode: lcode}),
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

<<<<<<< HEAD
  // const [readMore, setReadMore] = useState(false);
=======
  const showAbout = () => {
    setShowWord(5);
  };
  

  function getDate() {
    const currentDate = new Date().toLocaleDateString();
  }

  const [readMore, setReadMore] = useState(false);
>>>>>>> main

  return (
    <Fragment>
      <Header onStatistics={showStatistics} onAddWord={showWordHandler} wordHandle={wordHandler} wordDisable={disableWord} />
      <main>
<<<<<<< HEAD
        {showWord===0 && <MainInfoCard showWord={wordHandler}/>}
        {showWord===1 && <Word wordData={wordData} languageCode={languageCode} onLanguageChange={handleLanguageChange}/>}
        {showWord===2 && <WordNotFound onAddWord={showWordHandler} wordSearched={searchedWord}/>}
        {showWord===3  && <AddWord onClose={hideWordHandler} />}
        {showWord===4 && <Statistics onClose={hideStatistics} />}
=======
        {showWord==0 && <MainInfoCard showWord={wordHandler}/>}
        {showWord==1 && <Word wordData={wordData} languageCode={languageCode} onLanguageChange={handleLanguageChange}/>}
        {showWord==2 && <WordNotFound onAddWord={showWordHandler} wordSearched={searchedWord}/>}
        {showWord==3  && <AddWord onClose={hideWordHandler} />}
        {showWord==4 && <Statistics onClose={hideStatistics} />}
        {showWord==5 && <About onAbout = {showAbout}/>}
>>>>>>> main
      </main>
    </Fragment>
  );
}
// changes added
export default Home;
