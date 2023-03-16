import PropTypes from 'prop-types'
import React, { Component } from 'react'
import InfoCard from '../InfoCard/InfoCard'
import classes from './MainInfoCard.module.css';


export default class MainInfoCard extends Component {

 

  render() {
    return (
      <div id = "ParentWala" style={{paddingBottom:"1rem",borderBottom:"2px solid #6b6a6a",width:"35rem"}}>
        <div style={{marginTop:"7rem",marginLeft: "50%",width:"700px"}} className={classes.MainInfoCard}>
          <InfoCard  />
          </div>
          <div id = "WordWala" style={{marginTop:"2rem",marginLeft: "50%",width:"700px"}} className={classes.MainInfoCard}>
        <InfoCard  title={"Word of the day"} word={"Spring"} meaning={"Meaning: Season of the year between Winter and Summer"} Usage={"USAGE: The best time to visit Florida is during Spring Season."}
        
        />
        </div>
        <div id = "TrendingWala" style={{marginTop:"2rem",marginLeft: "50%",width:"700px"}} className={classes.MainInfoCard}>
        <InfoCard  title={"Trending word"} word={"Pandemic"} meaning={"Meaning: A disease prevalent throughout an entire country, continent, or the whole world"} Usage={"USAGE: Since the Pandemic started, around 75% of the world's force is now working from home."}/>
        </div>
        </div>
    )
  }
}
