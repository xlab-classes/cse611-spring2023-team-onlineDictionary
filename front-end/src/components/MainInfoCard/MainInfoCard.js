import PropTypes from 'prop-types'
import React, { Component } from 'react'
import InfoCard from '../InfoCard/InfoCard'
import classes from './MainInfoCard.module.css';


export default class MainInfoCard extends Component {

 

  render() {
    return (
      <div id = "ParentWala" style={{paddingBottom:"1rem",borderBottom:"2px solid #6b6a6a",width:"35rem"}}>
        <div style={{marginTop:"7rem",width:"15px", height:"15px"}} className={classes.MainInfoCard}>
          <img src={require("C:\\Users\\Robin\\Desktop\\UB Sem 2\\611\\cse611-spring2023-team-onlineDictionary\\front-end\\src\\components\\dictionary.jpg")} alt="Dictionary Image" /> 
          </div>
          <div id = "WordWala" style={{width:"550px",borderColor:" black",borderStyle:"solid"}} className={classes.MainInfoCard}>
        <InfoCard  title={"Word of the day"} word={"lead"} pronounciation={"/lēd/"} meaning={"Meaning(v): cause (a person or animal) to go with one by holding them by the hand, a halter, a rope, etc. while moving forward."} Usage={"USAGE: she emerged leading a bay horse."} meaning2={"Meaning(n): the initiative in an action."} Usage2={"USAGE: the US is now taking the environmental lead."}
        
        />
        </div>
        <div id = "TrendingWala" style={{width:"550px"}} className={classes.MainInfoCard}>
        <InfoCard  title={"Trending word"} word={"Pandemic"} pronounciation={"/panˈdemik/"}  meaning={"Meaning(n): A disease prevalent throughout an entire country, continent, or the whole world"} Usage={"USAGE: Since the Pandemic started, around 75% of the world's force is now working from home."} meaning2={"Meaning(adj.): (of a disease) prevalent over a whole country or the world."} Usage2={"USAGE: pandemic diseases have occurred throughout history."}/>
        </div>
        </div>
    )
  }
}
