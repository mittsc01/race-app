import React from 'react'
import RaceContext from './RaceContext'

export default function Results(props){
    return (
        <RaceContext.Consumer>
            {context=>{
                const race = context.races.find(race=>race.id==props.match.params.id)
                const results = race.results
                                    .map((result,i)=><li key={`result-${i}`}>{`${result.place}. ${result.name}`}</li>)
            return (
                <div>
                    <h2>{race.name}</h2>
                    <p>{`${race.city}, ${race.state} ${race.date}.`}</p>
                    <ul>
                        {results}
                    </ul>
                    <button onClick={()=>props.history.goBack()}>Back</button>
                </div>
                
            )
                
            }}
        </RaceContext.Consumer>
        
    )
}

