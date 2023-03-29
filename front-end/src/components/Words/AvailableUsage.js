import { wordData } from "../../assets/WordData";
import Card from "../UI/Card";
import classes from "./AvailableUsage.module.css";
import Pos from "./Usage/Pos";
import FormatPos from "./Formatting/FormatPos";
import WordSummary from "./Usage/WordSummary";
import Definitions from "./Usage/Definitions";
import React from "react";
const AvailableUsage = () => {
  var [posDictionary,defList] = FormatPos(wordData);
  console.log(defList);
  // const posList = wordData['usage'].map(word => <Pos key={wordData['usage'].indexOf(word)} item={word} />);
  var posList = [];

  for (var key in posDictionary) {
    posList.push(
      <Pos key={posList.length} item={posDictionary[key]} name={key} />
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <WordSummary word={wordData["word"]} />
        <ul>{posList}</ul>
        <Definitions item={defList} name="Definitions"/>

      </Card>
    </section>
  );
};

export default AvailableUsage;
