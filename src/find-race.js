import React from 'react'
import RaceContext from './RaceContext'
import {Link} from 'react-router-dom'

export default class FindRace extends React.Component {
    state = {
        search: ''
    }
    static contextType = RaceContext

    handleChange = (e) => {
        this.setState({
            search: e.target.value.toLowerCase()
        })
    }
    render(){
        
    const listOfRaces = this.context.races
            .filter(race=>race.name.toLowerCase().includes(this.state.search))
            .map((race,i)=><li key={'master'+i}><Link to={`/races/${race.id}`}>{race.name}</Link></li>)
        return (
            <div>
              <form>
                  <label htmlFor="race-search">Search for race:</label>
                  <input name='race-search' className="race-search" type='text' onChange={this.handleChange} />
                </form>
        <ul>{listOfRaces}</ul>
                 
            </div>
        )
    }
}