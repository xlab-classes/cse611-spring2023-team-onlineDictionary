import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Card from "../UI/Card";
import classes from './InfoCard1.module.css';
import Modal from '../UI/Modal';
  
export default class InfoCard1 extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       modalFlag: false
    }
  }

  hideWordHandler = () => {
    this.setState({
      modalFlag: !this.state.modalFlag
    })
    if (this.state.modalFlag){
      this.listContent()
    }
  };


  render() {
    const green = 40 + (this.props.index + 1) * 13;
    const blue = (this.props.index + 1) * 7;
    const opacity = 1 - (this.props.index +1) * 0.05;
    const buttonColor = `rgba(215, ${green}, ${blue}, ${opacity})`;
    
    return (
      <div>
        <button
          className={classes.woddbutton}
          style={{
            width: `${100 - this.props.index * 8}%`,
            minWidth: '200px',
            backgroundColor: buttonColor
          }}
          onClick={() => this.props.showWord(this.props.word)}
        >
          <a className={classes.wodd}> {this.props.index + 1} {this.props.word} </a>
        </button>
      </div>
    )
  }
}  