import React, { useState, useEffect } from 'react'

import RacesService from './services/races-service'

export default function Results(props) {
    const [myResults, setResults] = useState({})
    useEffect( () => {
        
        (async () => {
            
            
            const myResults =  await RacesService.getData(props)
            
        setResults(myResults)})()
    }, [props])

    




    const results = myResults.results
        ? myResults.results
        .map((result, i) => <li key={`result-${i}`}>{`${result.place}. ${result.name}`}</li>)
        : null
    return (
        <div>
            {myResults.name?<h2>{myResults.name}</h2>:null}
            {results?<ul>
                {results}
            </ul>:<p>No results have been posted for this event.</p>}
            <button onClick={() => props.history.goBack()}>Back</button>
        </div>

    )

}

