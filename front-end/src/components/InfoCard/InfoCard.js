import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Card from "../UI/Card";
import classes from './InfoCard.module.css';
import Modal from '../UI/Modal';
  
export default class InfoCard extends Component {

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

  listContent = () => {
    const { listData } = this.props
    return (
      <div style={{overflowY:'auto',overflowX:'hidden',height:'530px'}}>
      {
        listData.map((value,ind) => {
          // if(ind < 10)
          return  <a> <div title = "Click to see more details!" className={classes.Modall1 + " data-color-"+ind } onClick={()=>this.props.showWord(value)}>{value }
          
          </div>
          </a>
        })
      }
      
      </div>
    )
  }

  render() {
    const { listFlag, listFlagg, TOD } = this.props
    const { modalFlag } = this.state
    return (
        <div>
            {modalFlag && <Modal onClose={() => this.hideWordHandler()}>{this.listContent()}</Modal>}
            <div>{this.props.img}</div>
            <h2>{this.props.title}</h2>
            <button className= {classes.woddbutton}>
                <a className={classes.wodd} onClick={()=>this.props.showWord(this.props.word)}> {this.props.word} </a>
            </button>
            <h3>{this.props.month} {this.props.datee && this.props.datee+","} {this.props.yearr}</h3>
             {listFlag && <button className={classes.buttonnon} id="myBtn" onClick={() => this.hideWordHandler()}>Show More</button>}
        </div>
    )
   
  }
}
