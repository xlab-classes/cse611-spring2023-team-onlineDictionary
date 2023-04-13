import React, { useState, useEffect } from "react";
import classes from "./Statistics.module.css"
import Modal from "../../UI/Modal";

function Statistics(props) {
  const [statis, setStatistics] = useState(false);
  
  useEffect(() => {
    test();
  }, []);

  async function test() {
    await fetch(`http://localhost:3001/getWord/getStatistics`)
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
    <Modal onClose={props.onClose}>
      <ul className={classes.ul}>{statList}</ul>
    </Modal>
  );
}

export default Statistics;
