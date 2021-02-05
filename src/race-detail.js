import React, { useEffect, useState } from 'react'
import RacesService from './services/races-service'
import { Link } from 'react-router-dom'
import './race-detail.css'

export default function RaceDetail(props) {
    const [run, setRun] = useState({})
    useEffect( () => {
        
        (async () => {
            const data =  await RacesService.getRaceById(props.match.params.id)
        setRun(data)})()
    }, [props])
    const race = {...run}
    if (race.time){
        race.time = makeTime(race.time)
    }

    function makeTime(string){
        
        const timeArray = string.split(":")
        const hours = parseInt(timeArray[0])
        const minutes = timeArray[1]
        if (hours === 0){
            return `12:${minutes} AM`
        }
        if (hours < 12){
            return `${hours}:${minutes} AM`
        }
        if (hours === 12){
            return `12:${minutes} PM`
        }
        return `${hours - 12}:${minutes} PM`
    }



    return (
        <div>
            <h2>{race.name}</h2>
            <p>Time: {race.time}</p>
            <p>Location: {race.city}, {race.state}</p>
            <p><Link to={`/races/${race.id}/results`}>Results</Link></p>
            <button onClick={() => props.history.goBack()}>Back</button>
        </div>
    )
}



