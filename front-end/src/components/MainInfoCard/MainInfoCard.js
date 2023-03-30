import PropTypes from 'prop-types'
import React from 'react'
import InfoCard from '../InfoCard/InfoCard'
import classes from './MainInfoCard.module.css';


export default class MainInfoCard extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
        WOD: null,
        TOD: null
      }
    }

    componentDidMount() {
        console.log("in MainInfoCard.js");
            
        fetch(`http://localhost:3001/getword/wordoftheday`)
            .then((response) => response.json())
            .then((result) => {
                fetch(`http://localhost:3001/${result.wordoftheDay}`)
                .then((response2) => response2.json())
                .then((result2) => {
                        console.log(result)
                        this.setState({
                            WOD: result2
                        })
                    })
                    .catch((error2) => console.log(error2));
            })
            .catch((error) => console.log(error));
            console.log("completed");

        fetch(`http://localhost:3001/getword/trendingword`)
            .then((response) => response.json())
            .then((result) => {
                fetch(`http://localhost:3001/${result.trendingWord}`)
                .then((response2) => response2.json())
                .then((result2) => {
                        console.log(result)
                        this.setState({
                            TOD: result2
                        })
                    })
                    .catch((error2) => console.log(error2));
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
                        title={"Word of the day"} 
                        word={WOD.wordoftheDay} 
                        meaning={WOD.meaning} 
                        Usage={WOD.Usage}
                        
                        />
                </div>}
                {TOD &&
                <div className={classes.MainInfocard}>
                    <InfoCard  
                        title={"Trending word"} 
                        word={TOD.trendingWord} 
                        meaning={TOD.meaning} 
                        Usage={TOD.Usage}
                        />
                </div>}
            </div>
        </>
        )
    }
}
