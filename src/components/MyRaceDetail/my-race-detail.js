import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import RacesService from '../../services/races-service'

export default function MyRaceDetail(props) {
    const [race, setRace] = useState({})
    useEffect( () => {
        
        (async () => {
            const data =  await RacesService.getData(props)
        setRace(data)})()
    }, [props])

    return (
        <div>
            <p>{race.name}</p>
            <p>Time: {race.time}</p>
            <p>Location: {race.city}, {race.state}</p>
            <p><Link to={`/my-races/${race.id}/results`}>Results</Link></p>
            <button onClick={() => props.history.goBack()}>Back</button>
        </div>
    )




}