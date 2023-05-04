import React, { useState, useEffect, Fragment } from "react";
import classes from "./Statistics.module.css"
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import Plot from 'react-plotly.js';

function Statistics(props) {
  const [statis, setStatistics] = useState(false);
  const [statisDaily,setStatisticsDaily] = useState(false);
  
  useEffect(() => {
    test();
  }, []);

  useEffect(() => {
    testDaily();
  }, []);

  async function test() {
    await fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getWord/getStatistics`)
      .then((response) => response.json())
      .then((result) => {
        setStatistics(result);
      });
  }

  async function testDaily() {
    await fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getWord/getStatistics`)
      .then((response1) => response1.json())
      .then((result1) => {
        setStatisticsDaily(result1);
      });
  }

  var statList = [];

  for (var key in statis) {
    if (key == "_id") {
      continue;
    }
    statList.push(
      <li className={classes.li}>
       <h5>{key}</h5> <h5>{statis[key]}{" "}
        </h5>
      </li>
    );
  }

  return (
   <div id = "wrapper" className={classes.card}style={{width: "1200px"}} >
    <div id = "Stat1" style={{margin: 10,backgroundColor: '#031839',paddingLeft:'10px',paddingRight:'10px',borderRadius:'10px'}}>
      <h2 style={{ color: 'white' }}>Word Statistics</h2>
      <h4 style={{fontStyle:'italic',color: 'white'}}>The below graph contains our corpus data. It shows the number of words we have available, number of Audios and example sentences. The list is bound to be expanded since we are learning and adding new words everyday!</h4>
    <Plot
        data={[
          {type: 'bar', x: ['Words', "Words with Defns", "Words with Audio","Words with Example","Total Audios","Total Defns","Total Examples"], y: [statis.Words, statis.WordsWithDefintions, statis.WordsWithAudios,statis.WordsWithExamples,statis.TotalAudios,statis.TotalExamples,statis.TotalDefinitions]},
        ]}
        layout={ { width: 550 ,height: 500, plot_bgcolor: 'white',borderRadius:'20px'} }
        
      />
    </div>
    <div id = "Stat2" style={{margin: 10,backgroundColor: '#031839',paddingLeft:'10px',paddingRight:'10px',borderRadius:'10px'}}>
    <h2 style={{ color: 'white' }}>Statistics of the day</h2>
      <h4 style={{fontStyle:'italic',color: 'white'}}>The below graph shows day-to-day logging activity on this website including daily traffic, words searched, sessions etc!</h4>
      <br>
      </br>
      <br>
      </br>
      
    <Plot
       
        data={[
          {type: 'bar', x: ['Total Visits', "Total Users", "Sessions per User","Numbers per Query"], y: [12,4,2,29,]},
        ]}
        layout={ {
          width: 550, height: 500,plot_bgcolor: 'white',borderRadius:'20px'}}
      />
    </div>
    </div>
  );
}

export default Statistics;
