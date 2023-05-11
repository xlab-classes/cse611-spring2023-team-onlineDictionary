import Card from "../UI/Card";
import classes from "./AvailableUsage.module.css";
import Pos from "./Usage/Pos";
// import FormatPos from "./Formatting/FormatPos";
import WordSummary from "./Usage/WordSummary";
import Definitions from "./Usage/Definitions";

const AvailableUsage = (props) => {

  function handleLanguageChange(data){
    props.onLanguageChange(data);
  }
  // var [posDictionary,defList,audioList] = FormatPos(props.wordData);
  // console.log(audioList);
  // console.log(defList);
  const posList = props.wordData["meanings"].map((meaning) => (
    <Pos
      key={props.wordData["meanings"].indexOf(meaning)}
      data={meaning}
    />
  ));

  // for (var key in props['meanings']) {
  //   console.log(key)
  //   posList.push(
  //     <Pos key={props['meanings'].length} item={[]} name={key} />
  //   );
  // }

  return (
    <section className={classes.meals}>
      <Card>
        <WordSummary word={props.wordData["word"]} ipa = {props.wordData["ipa"]} languageCode={props.languageCode} onLanguageChange = {handleLanguageChange} />
        <ul>{posList}</ul>
        {"generalExamples" in props.wordData &&  <Definitions item={props.wordData.generalExamples} name="Example Usage"/>}
      </Card>
    </section>
  );
};

export default AvailableUsage;
