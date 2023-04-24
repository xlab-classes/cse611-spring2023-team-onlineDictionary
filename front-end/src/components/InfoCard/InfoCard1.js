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
    const green = 40 + (this.props.index + 1) * 12;
    const blue = 20 + (this.props.index + 1) * 8
    const buttonColor = `rgba(200, ${green}, ${blue}, 1)`;
    
    return (
      <div>
        <button
          className={classes.woddbutton}
          style={{
            width: `${600 - this.props.index * 50}px`,
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