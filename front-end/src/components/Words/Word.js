import { Fragment } from 'react';
import Card from '../UI/Card';
import classes from './Word.module.css';
import AvailableUsage from './AvailableUsage';


const Word = (props) => {
  return (
    <Fragment>
     <AvailableUsage wordData={props.wordData}/>
    </Fragment>
  );
};

export default Word;