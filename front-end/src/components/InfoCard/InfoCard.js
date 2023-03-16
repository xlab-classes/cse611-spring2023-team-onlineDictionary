import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Card from "../UI/Card";
import classes from './InfoCard.module.css';
export default class InfoCard extends Component {

  render() {
    return (
      <div style={{marginTop:"4rem"}}>
      <Card >
            <div className={classes.InfoCard}>
                <div>
                  <div>
                    {this.props.img}
                  </div>
                    <h2>{this.props.title}</h2>
                    <div >
                        <span >
                            <a href="#" >{this.props.word}</a>
                            </span>
                    </div>
                    <div>
                      <h4>{this.props.meaning}</h4>
                    </div>
                    <div>
                      <h4>{this.props.Usage}</h4>
                    </div>
                </div>
            </div>
             </Card>
      </div>
    )
  }
}
