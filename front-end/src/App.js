import logo from "./logo.svg";
import { useState, useRef } from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import InfoCard from "./components/InfoCard/InfoCard";

function App() {
  const [showWord, setShowWord] = useState(false);

  async function  wordHandler() {
    console.log("in app.js");
    var wordData = {};
    await fetch("http://localhost:3001/mongo/college")
      .then((response) => response.json())
      .then((result) => wordData=result['body'])
      .catch((error) => console.log("error", error));
    console.log(wordData);
    setShowWord((prevState) => {
      return !prevState;
    });
  }

  return (
    <Fragment>
      <Header wordHandle={wordHandler} />
      <main >{showWord && <Word />}
      <div style={{marginTop:"6rem"}}>
      <InfoCard title={"Word of the day"} word={"piano"}/>
      <InfoCard title={"Trending word"} word={"timer"}/>
      </div>
      </main>
    
    </Fragment>
  );
}

export default App;
