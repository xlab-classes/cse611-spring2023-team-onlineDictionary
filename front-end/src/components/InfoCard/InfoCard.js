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
                <a href="#" >{this.props.word}</a>
            </span>
            <h4>{this.props.pronounciation}</h4>
            <h4>{this.props.meaning}</h4>
            <h4>{this.props.Usage}</h4>
            <h4>{this.props.meaning2}</h4>
            <h4>{this.props.Usage2}</h4>
        </div>
    )
  }
}
