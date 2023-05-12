import { useState } from "react";
import classes from "./Definitions.module.css";

const Definitions = (props) => {
  const [numExamples, setNumExamples] = useState(5);
  const defList = props.item.slice(0, numExamples).map((item,index) => <li key={index}>{item.text} <sub className={classes.examplesource}>{item.source}</sub></li>);

  const handleShowMore = () => {
    setNumExamples(numExamples + 5);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h1>{props.name}</h1>
        <ul>{defList}</ul>

        {numExamples < props.item.length && (
          <button 
            className={classes.showMoreButton} 
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </li>
  );
};

export default Definitions;
