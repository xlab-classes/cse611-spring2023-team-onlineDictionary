import React, { useState, useEffect, Fragment } from "react";
import classes from "./Statistics.module.css"
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";
import Plot from 'react-plotly.js';

function Statistics(props) {
  const [statis, setStatistics] = useState(false);
  
  useEffect(() => {
    test();
  }, []);

  async function test() {
    await fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getWord/getStatistics`)
      .then((response) => response.json())
      .then((result) => {
        setStatistics(result);
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
    <div id = "Stat1" style={{margin: 10}}>
    <Plot
        data={[
          {type: 'bar', x: ['Words', "Words with Defns", "Words with Audio","Words with Example","Total Audios","Total Defns","Total Examples"], y: [124689, 124688, 26174,57340,45890,120796,160732]},
        ]}
        layout={ { width: 550 ,height: 500, title: 'Word Statistics'} }
      />
    </div>
    <div id = "Stat2" style={{margin: 10}}>
    <Plot
       
        data={[
          {type: 'bar', x: ['Total Visits', "Total Users", "Sessions per User","Numbers per Query"], y: [12,4,2,29,]},
        ]}
        layout={ {width: 550, height: 500, title: 'Statistics of the Day'} }
      />
    </div>
    </div>
  );
}

export default Statistics;
