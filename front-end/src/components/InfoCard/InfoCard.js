import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Card from "../UI/Card";
import classes from './InfoCard.module.css';

export default class InfoCard extends Component {

  
  render() {
    return (
        <div>
            <div>{this.props.img}</div>
            <h2>{this.props.title}</h2>
            <span >
                <a id ="wodd" href="#" style={{ fontSize: '2em' }} onClick={()=>this.props.showWord(this.props.word)}  >{this.props.word} </a>
            </span>
            <h3>{this.props.month} {this.props.datee && this.props.datee+","} {this.props.yearr}</h3>
            {/* <h4><a href="#" onClick={()=>!this.props.textSM && this.props.textSM} ></a></h4> */}
        </div>
    )
  }
}
