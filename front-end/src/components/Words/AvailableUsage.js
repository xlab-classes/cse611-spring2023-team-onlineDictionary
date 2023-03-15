import Card from "../UI/Card";
import classes from "./AvailableUsage.module.css";
import Pos from "./Usage/Pos";
import FormatPos from "./Formatting/FormatPos";
import WordSummary from "./Usage/WordSummary";
import Definitions from "./Usage/Definitions";

const AvailableUsage = (props) => {
  
  var [posDictionary,defList,audioList] = FormatPos(props.wordData);
  // console.log(audioList);
  // console.log(defList);
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
        <WordSummary word={props.wordData["word"]} audio={audioList} />
        <ul>{posList}</ul>
        <Definitions item={defList} name="Example Sentences"/>

      </Card>
    </section>
  );
};

export default AvailableUsage;
