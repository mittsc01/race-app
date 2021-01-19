import React from 'react'
import RaceContext from './RaceContext'
import {Link} from 'react-router-dom'

export default function RaceDetail(props) {
    return (
        <RaceContext.Consumer>
            {context => {
                //console.log(context)
                const race = context.races.find(race => race.id === parseInt(props.match.params.id) )



                return (
                    <div>
                        <p>{race.name}</p>
                        <p>Time: {race.time}</p>
                        <p>Location: {race.city}, {race.state}</p>
                        {race.results?<p><Link to={`/races/${race.id}/results`}>Results</Link></p>:null}
                        <button onClick={()=>props.history.goBack()}>Back</button>
                    </div>
                )
            }
            }
        </RaceContext.Consumer>
    )

}