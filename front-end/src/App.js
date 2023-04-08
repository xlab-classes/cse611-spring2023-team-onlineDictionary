import { useState} from "react";
import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Word from "./components/Words/Word";
import WordNotFound from "./components/Words/WordNotFound";
import AddWord from "./components/Words/AddWord/AddWord";
import React from "react";

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
      body: JSON.stringify({ word: word , languageCode: "en-US" })
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
  
//   var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none"
  //  fetch(`http://localhost:3001/getword/trendingword`)
  // .then((response) => response.json())
  // .then((result) => {
  //     console.log("Check",result)
  //     this.setState({
  //         TOD: result.trendingWords[0]
  //     })
  // })
  // .catch((error) => console.log(error));;
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
  

  return (
    <Fragment>
      {addWordHandler && <AddWord onClose={hideWordHandler} />}
      <Header wordHandle={wordHandler} wordDisable={disableWord} />
      <main>
        {showWord==0 && <MainInfoCard showWord={wordHandler}/>}
        {showWord==1 && <Word wordData={wordData} />}
        {showWord==2 && <WordNotFound onAddWord={showWordHandler}/>}

        {/* <div id="myModal" class="modal">

              <div class="modal-content">
                <span class="close"></span>
              </div>
        </div> */}
        
      </main>
    </Fragment>
  );
}

export default App;
