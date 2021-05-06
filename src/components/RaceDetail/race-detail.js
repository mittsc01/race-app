import React, { useEffect, useState } from 'react'
import RacesService from '../../services/races-service'
import { Link } from 'react-router-dom'
import './race-detail.css'

export default function RaceDetail(props) {
    const [race, setRace] = useState({})
    useEffect( () => {
        
        (async () => {
            const data =  await RacesService.getRaceById(props.match.params.id)
        setRace(data)})()
    }, [props])
   

    function prettifyDate(astring){
        const [year,month,day] = astring.split('-')
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
        return `${parseInt(day)} ${months[month-1]}, ${year}`
    }
    //converts string from 24 hour time to 12 hour time with AM/PM
    function prettifyTime(time){
        const [hours,minutes]=time.split(':')
        if (hours>12){
            return `${parseInt(hours)-12}:${minutes} PM`

        }
        if (parseInt(hours) === 12){
            return `${hours}:${minutes} PM`
        }
        if (parseInt(hours) === 0){
            return `12:${minutes} AM`
        }
        return `${parseInt(hours)}:${minutes} AM`
    }



    return (
        <div>
            <h2>{race.name}</h2>
            <p>Date: {race.date?prettifyDate(race.date):null}</p>
            <p>Time: {race.time?prettifyTime(race.time):null}</p>
            <p>Location: {race.city}, {race.state}</p>
            <p>Distance: {race.distance}</p>
            <p><Link to={`/races/${race.id}/results`}>Results</Link></p>
            <button onClick={() => props.history.goBack()}>Back</button>
        </div>
    )
}



