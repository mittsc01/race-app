import React, { useState, useEffect } from 'react'
import RacesService from './services/races-service'




export default function MyResults(props) {
    const [myResults, setResults] = useState({})
    
    useEffect( () => {
        
        (async () => {
            const data =  await RacesService.getData(props)
        setResults(data)})()
    }, [props])

    
    const handleDelete = (e) => {
        
        RacesService.deleteFinisher(props.match.params.id, e.target.id)
            .then(
                () => {

                    return RacesService.getData(props)
                }
            )
            .then(data => {
                setResults({...data})

            })


    }

    const handleAdd = (e) => {
        e.preventDefault()

        
        const finisher = {
            name: e.target.name.value,
            race_id: props.match.params.id,
            time: e.target.time.value,
            place: e.target.place.value,
            gender: e.target.gender.value,
            age: e.target.age.value,
            status: e.target.status.value
        }


        RacesService.postFinisher(props.match.params.id, JSON.stringify(finisher))
            .then(
                () => {

                    return RacesService.getData(props)
                })
            .then(data => {
                setResults({...data})
                e.target.name.value = ''
                e.target.time.value = ''
                e.target.place.value = ''
                e.target.gender.value = ''
                e.target.age.value = ''
                e.target.status.value = ''
            })




    }



    const results = myResults.results
        ? myResults.results
        .map((result, i) => <li key={`result-${i}`}>{`${result.place}. ${result.name}`}
            <button id={result.id} onClick={e => handleDelete(e)}>Delete</button>
        </li>)
        : null
    return (
        <div className="my-results">
            {myResults.name
            ? <h2>{myResults.name}</h2>
            :null
            }
            
                {results
                ? <ul>{results}</ul>
                : <p>No results currently available for this event.</p>
                }
            
            <h3>Add Finisher</h3>
            <form onSubmit={(e) => handleAdd(e)}>
                <label htmlFor="name">Name</label>
                <input name="name" type="text" placeholder="finisher" required />
                <label htmlFor="status">Status</label>
                <input name="status" type="text" defaultValue="Finisher" />
                <label htmlFor="place">Place</label>
                <input name="place" type="number" min={1} placeholder={1} />
                <label htmlFor="time">Time</label>
                <input name="time" type="text" placeholder="mm:ss" />
                <label htmlFor="gender">Gender</label>
                <select name="gender">
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
                <label htmlFor="age">Age</label>
                <input name="age" type="number" placeholder="age" required />
                <button type="submit">Submit</button>
                <button onClick={() => props.history.goBack()}>Back</button>
            </form>
        </div>

    )

}

