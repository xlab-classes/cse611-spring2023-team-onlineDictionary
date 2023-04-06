import PropTypes from 'prop-types'
import React from 'react'
import InfoCard from '../InfoCard/InfoCard'
import classes from './MainInfoCard.module.css';
import ReactDOM from "react-dom";
import { useState } from 'react';
export default class MainInfoCard extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
        WOD: null,
        TOD: null
      }
      this.state={
        monthh: new Date().toLocaleDateString('en-us', { month: 'long' }),
        date1: new Date().toLocaleDateString('en-us', { day: '2-digit' }),
        yearr: new Date().getFullYear()
      };
this.state1={
    textSM: "Show More.."
}
      
      
    }
   

    componentDidMount() {
        console.log("in MainInfoCard.js");
            
        fetch(`http://localhost:3001/getword/wordoftheday`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    WOD: result
                })
            })
            .catch((error) => console.log(error));
            console.log("completed");

        fetch(`http://localhost:3001/getword/trendingword`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    TOD: result
                })
            })
            .catch((error) => console.log(error));
    }

    render() {
        
        const { WOD, TOD } = this.state
        return (
        <>
            <div className={classes.MainCard}>
                {WOD && 
                <div className={classes.MainInfocard}>
                    <InfoCard
                        title ={"WORD OF THE DAY"} 
                        word={WOD.wordoftheDay} 
                        showWord={this.props.showWord}
                        month = {this.state.monthh}
                        datee = {this.state.date1}
                        yearr = {this.state.yearr}
                        />
                </div>}
                {TOD &&
                <div className={classes.MainInfocardTrend}>
                    <InfoCard  
                        title={"TRENDING WORD"}
                        word={TOD.trendingWord}
                        showWord={this.props.showWord}
                       // textSM = {this.state1.textSM}
                        ></InfoCard>
                </div>}
            </div>
        </>
        )
    }
}
