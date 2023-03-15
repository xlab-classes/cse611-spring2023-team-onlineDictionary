import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Card from "../UI/Card";
export default class InfoCard extends Component {

  render() {
    return (
      <div style={{marginTop:"1rem"}}>
      <Card >
            <div >
                <div>
                    <h2>{this.props.title}</h2>
                    <div >
                        <span >
                            <a href="#" >{this.props.word}</a>
                            </span>
                    </div>
                </div>
            </div>
             </Card>
      </div>
    )
  }
}
