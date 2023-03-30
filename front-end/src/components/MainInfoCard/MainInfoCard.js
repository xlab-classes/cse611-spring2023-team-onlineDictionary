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
                console.log(result)
                this.setState({
                    WOD: result
                })
            })
            .catch((error) => console.log(error));
            console.log("completed");

        fetch(`http://localhost:3001/getword/trendingword`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    TOD: result
                })
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
                        meaning={"Meaning(v): cause (a person or animal) to go with one by holding them by the hand, a halter, a rope, etc. while moving forward."} 
                        Usage={"USAGE: she emerged leading a bay horse."} 
                        meaning2={"Meaning(n): the initiative in an action."} 
                        Usage2={"USAGE: the US is now taking the environmental lead."}
                        />
                </div>}
                {TOD &&
                <div className={classes.MainInfocard}>
                    <InfoCard  
                        title={"Trending word"} 
                        word={TOD.trendingWord} 
                        meaning={"Meaning(n): A disease prevalent throughout an entire country, continent, or the whole world"} 
                        Usage={"USAGE: Since the Pandemic started, around 75% of the world's force is now working from home."} 
                        meaning2={"Meaning(adj.): (of a disease) prevalent over a whole country or the world."} 
                        Usage2={"USAGE: pandemic diseases have occurred throughout history."}
                        />
                </div>}
            </div>
        </>
        )
    }
}
