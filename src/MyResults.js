import React from 'react'
import RaceContext from './RaceContext'

export default function MyResults(props){
    return (
        <RaceContext.Consumer>
            {context=>{
                const results = context.races.find(race=>race.id===parseInt(props.match.params.id))
                                            .results
            .map((result,i)=><li key={`result-${i}`}>{`${result.place}. ${result.name}`}<button>Delete</button></li>)
            return (
                <div className="my-results">
                    <ul>
                        {results}
                    </ul>
                    <h2>Add Finisher</h2>
                    <form>
                        <label for="name">Name</label>
                        <input name="name" type="text" placeholder="finisher" required/>
                        <label for="place">Place</label>
                        <input name="place" type="number" min={1} placeholder={1} required/>
                        <label for="time">Time</label>
                        <input name="time" type="text" placeholder="mm:ss"/>
                        <label for="gender">Gender</label>
                        <select name="gender">
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                        <label for="age">Age</label>
                        <input name="age" type="number" placeholder="age" required />
                        <button type="submit">Submit</button>
                        <button onClick={()=>props.history.goBack()}>Back</button>    
                    </form>
                </div>
                
            )
                
            }}
        </RaceContext.Consumer>
        
    )
}