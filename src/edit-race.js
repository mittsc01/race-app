import React from 'react'
import RaceContext from './RaceContext'
import moment from 'moment'
export default class EditRace extends React.Component {
    static contextType = RaceContext

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.time.value,e.target.date.value)

    }
    render(){
        const raceEdit = this.context.races.find(race=>race.id==this.props.match.params.id)
        console.log(raceEdit)
        
        return (
            <form className='edit-race' onSubmit={this.handleSubmit}>
                <label htmlFor="name" >Race name</label>
                <input name='name' type='text' defaultValue={raceEdit.name} required/>

                <label htmlFor="date">Race Date</label>
                <input name='date' type='date' defaultValue={raceEdit.date} required/>
                
                <label htmlFor="city">City</label>
                <input name='city' type='text' defaultValue={raceEdit.city} required />

                <label htmlFor="state">State</label>
                <select id="states" name="states" size="1" required defaultValue={raceEdit.state}> 
                <optgroup label="state">
                <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option> 
                </optgroup>
            
             
        </select>

                <label htmlFor="time">Race Time</label>
                <input name='time' type='time' defaultValue={raceEdit.time} required/>

                <label htmlFor="distance">Race Distance</label>
                <input name='distance' type='text' />
                
                <button type="submit">Add Race</button>
                
            </form>
        )
    }
}