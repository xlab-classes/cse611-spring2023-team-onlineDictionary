import logo from "./logo.svg";
import { useState, useRef } from "react";
import React,{ Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import InfoCard from "./components/InfoCard/InfoCard";
import MainInfoCard from "./components/MainInfoCard/MainInfoCard";

function App() {
  const [showWord, setShowWord] = useState(false);

  async function  wordHandler() {
    console.log("in app.js");
    var wordData = {};
    await fetch("http://localhost:3001/mongo/college")
      //.then((response) => response.json())
      //.then((result) => wordData=result['body'])
      //.catch((error) => console.log("error", error));
    console.log(wordData);
    setShowWord((prevState) => {
      return !prevState;
    });
  }

  return (
    <Fragment>
      <Header wordHandle={wordHandler} />
      <main >{showWord && <Word />}
        <MainInfoCard>
          
        </MainInfoCard>
      </main>
    
    </Fragment>
  );
}

export default App;
