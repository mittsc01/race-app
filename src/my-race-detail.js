import React from 'react'
import RaceContext from './RaceContext'
import {Link} from 'react-router-dom'

export default function MyRaceDetail(props) {
    return (
        <RaceContext.Consumer>
            {context => {
                console.log(context)
                const myRace = context.races.find(race => race.id == props.match.params.id || {})



                return (
                    <div>
                        <p>{myRace.name}</p>
                        <p>Time: {myRace.time}</p>
                        <p>Location: {myRace.city}, {myRace.state}</p>
                        {myRace.results?<p><Link to={`/my-races/${myRace.id}/results`}>Results</Link></p>:null}
                        <button onClick={()=>props.history.goBack()}>Back</button>
                    </div>
                )
            }
            }
        </RaceContext.Consumer>
    )

}