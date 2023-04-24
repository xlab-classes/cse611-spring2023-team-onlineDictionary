import PropTypes from 'prop-types'
import React from 'react'
import InfoCard from '../InfoCard/InfoCard'
import InfoCard1 from '../InfoCard/InfoCard1'
import classes from './MainInfoCard.module.css';
import ReactDOM from "react-dom";
import { useState } from 'react';
export default class MainInfoCard extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
        wordLimit:5,
        WOD: null,
        TOD: null        
      }
      this.state={
        monthh: new Date().toLocaleDateString('en-us', { month: 'long' }),
        date1: new Date().toLocaleDateString('en-us', { day: '2-digit' }),
        yearr: new Date().getFullYear(),
        wordLimit:5
      };
    }

    setLimit() {
        this.setState((prevState) => {
          return { wordLimit: prevState.wordLimit + 5 };
        }, () => {
          const list = document.getElementById("trendList");
          list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
        });
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
        const { WOD, TOD } = this.state;
        const trendList =
          TOD &&
          TOD.slice(0, this.state.wordLimit).map((meaning, index) => (
            <InfoCard1
              word={meaning}
              index={index}
              showWord={this.props.showWord}
              listData={TOD}
              key={index}
              className={
                index >= this.state.wordLimit - 5
                  ? classes.trendListItemFadeIn
                  : ""
              }
            />
          ));
      
        return (
          <>
            <div className={classes.MainCard}>
              {WOD && (
                <div className={classes.MainInfocard}>
                  <InfoCard
                    title={"WORD OF THE DAY"}
                    word={WOD.wordoftheDay}
                    showWord={this.props.showWord}
                    month={this.state.monthh}
                    datee={this.state.date1}
                    yearr={this.state.yearr}
                  />
                </div>
              )}
              {TOD && (
                <div className={classes.MainInfocardTrend}>
                  <h1>TRENDING WORDS</h1>
                  <div id="trendList" className={classes.trendList}>
                    {trendList}
                  </div>
                  <button
                    className={classes.showmorebutton}
                    onClick={() => this.setLimit()}
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          </>
        );
      }
      
}