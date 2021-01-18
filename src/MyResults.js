import React from 'react'
import RaceContext from './RaceContext'

export default function MyResults(props){
    return (
        <RaceContext.Consumer>
            {context=>{
                const results = context.races.find(race=>race.id==props.match.params.id)
                                            .results
            .map((result,i)=><li key={`result-${i}`}>{`${result.place}. ${result.name}`}<button>Delete</button></li>)
            return (
                <div className="my-results">
                    <ul>
                        {results}
                    </ul>
                    <button>Add Finisher</button>
                    <form>
                        <input name="name" type="text" placeholder="finisher" required/>
                        <input name="place" type="number" min={1} placeholder={1} required/>
                        <input name="time" type="text" placeholder="mm:ss"/>
                        <select name="Gender">
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                        <button type="submit">Submit</button>
                        <button onClick={()=>props.history.goBack()}>Back</button>    
                    </form>
                </div>
                
            )
                
            }}
        </RaceContext.Consumer>
        
    )
}