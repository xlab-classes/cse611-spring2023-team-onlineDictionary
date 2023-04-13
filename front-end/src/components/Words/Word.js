import { Fragment } from 'react';
import Card from '../UI/Card';
import classes from './Word.module.css';
import AvailableUsage from './AvailableUsage';


const Word = (props) => {
  function handleLanguageChange(data){
    props.onLanguageChange(data);
  }
  return (
    <Fragment>
     <AvailableUsage wordData={props.wordData} onLanguageChange = {handleLanguageChange}/>
     
    </Fragment>
  );
};

export default Word;