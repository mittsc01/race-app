import React, { useState, useEffect } from 'react'

import RacesService from '../../services/races-service'

export default function Results(props) {

    function prettifyDate(date) {
        const [year, month, day] = date.split('-')

        return `${parseInt(month)}/${parseInt(day)}/${year}`
    }

    const [myResults, setResults] = useState({results: [],name: null, date: null, city: null, state: null})
    useEffect( () => {
        
        (async () => {
            
            
            const myResults =  await RacesService.getData(props)
            
            
        setResults(myResults)})()
    }, [props])

    




    const results = myResults.results.length
        ? myResults.results
        .map((result, i) => <li key={`result-${i}`}><span className='left-side'>{`${result.place}. ${result.name}`}</span>
        <span className="right-side">{result.time}</span></li>)
        : null
    return (
        <div>
            {myResults.name?<h2>{myResults.name}</h2>:null}
            <p className="race-info">
            {myResults.city
            ? <span>{myResults.city} </span>
            :null
            }
            {myResults.state
            ? <span>{myResults.state}, </span>
            :null
            }
            {myResults.date
            ? <span>{prettifyDate(myResults.date)}</span>
            :null
            }
            </p>
            {results?<ul>
                {results}
            </ul>:<p>No results have been posted for this event.</p>}
            <button onClick={() => props.history.goBack()}>Back</button>
        </div>

    )

}

