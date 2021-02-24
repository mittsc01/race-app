import React from 'react'
import { Link } from 'react-router-dom'
import RacesService from './services/races-service'

export default class FindRace extends React.Component {
    state = {
        search: '',
        races: []
    }


    handleChange = (e) => {
        this.setState({
            search: e.target.value.toLowerCase()
        })
    }

    async componentDidMount() {
        this.setState({ races: await RacesService.getAllRaces() })
    }
    render() {
        //date is "yyyy-mm-dd"
        function prettifyDate(date) {
            const [year, month, day] = date.split('-')

            return `${parseInt(month)}/${parseInt(day)}/${year}`
        }
        //date is yyyy/mm/dd, return -1  if date1 is later than date2, 1 ow
        function compareDates(date1, date2) {
            const date1Arr = date1
                .split('-')
                .map(item => parseInt(item))
            const date2Arr = date2
                .split('-')
                .map(item => parseInt(item))
            for (let i = 0; i < date1Arr.length; i++) {
                if (date1Arr[i] > date2Arr[i]) {
                    return -1
                }
                else if (date1Arr[i] < date2Arr[i]) {
                    return 1
                }
            }
            return 1


        }

        const listOfRaces = this.state.races
            .filter(race => race.name.toLowerCase().includes(this.state.search))
            .sort((a, b) => compareDates(a.date, b.date))
            .map((race, i) => <li key={'master' + i}>
                <Link to={`/races/${race.id}`}>{race.name}</Link>
                <p className="list-date">{prettifyDate(race.date)}</p>
            </li>)


        return (
            <div className='race-list'>
                <form id="search-bar">
                    <input name='race-search' className="race-search" type='text' placeholder='Search for race' onChange={this.handleChange} />
                </form>
                <ul>{listOfRaces}</ul>

            </div>
        )
    }
}