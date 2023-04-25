import React, { useState, useEffect, Fragment } from "react";
import classes from "./Statistics.module.css"
import Modal from "../../UI/Modal";
import Card from "../../UI/Card";

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
   <div className={classes.card}>
    {statList}
    </div>
  );
}

export default Statistics;
