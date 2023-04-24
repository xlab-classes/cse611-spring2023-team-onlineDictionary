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
            
        fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getword/wordoftheday`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    WOD: result
                })
            })
            .catch((error) => console.log(error));
            console.log("completed");

        fetch(`https://online-dictionary-backend-1.10xw8i3rxjwe.us-east.codeengine.appdomain.cloud/getword/trendingword`)
            .then((response) => response.json())
            .then((result) => {
                console.log("Check",result)
                this.setState({
                    TOD: result.trendingWords
                })
            })
            .catch((error) => console.log(error));
    }

    render() {
        
        const { WOD, TOD } = this.state
        return (
        <>
            <div className={classes.MainCard}>
                {1 && 
                <div className={classes.MainInfocard}>
                    <InfoCard
                        title ={"WORD OF THE DAY"} 
                        // word={WOD.wordoftheDay} 
                        showWord={this.props.showWord}
                        month = {this.state.monthh}
                        datee = {this.state.date1}
                        yearr = {this.state.yearr}
                        />
                </div>}
                {2 &&
                <div className={classes.MainInfocardTrend}>
                    <InfoCard  
                        title={"TRENDING WORD"}
                        // word={TOD[0]}
                        showWord={this.props.showWord}
                        // listData = {TOD}
                        listFlag = {true}
                        ></InfoCard>
                </div>}
            </div>
        </>
        )
    }
}