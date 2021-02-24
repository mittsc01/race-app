import React from 'react'
import './MyRaceList.css'
import RacesService from './services/races-service'
import { Link } from 'react-router-dom'


export default class MyRaceList extends React.Component {


    state = { myRaces: [] }

    async componentDidMount() {
        this.setState({ myRaces: await RacesService.getMyRaces() })
    }

    handleDelete = (e) => {
        const races = [...this.state.myRaces]
        RacesService.deleteRace(e.target.id)
            .then(
                () => {

                    this.setState({
                        myRaces: races.filter(race => {

                            return parseInt(race.id) !== parseInt(e.target.id)

                        })
                    })
                }
            )

    }
    render() {

        //date is stored as yyyy/mm/dd, return -1  if date1 is later than date2, 1 o.w.
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

        return (
            <div className='race-list'>
                <ul>
                    {this.state.myRaces
                        .sort((a, b) => compareDates(a.date, b.date))
                        .map((item, i) => {
                            return (
                                <li className="race-link" key={`my-race-${i}`}>
                                    <Link to={`/my-races/${item.id}/view`}>{item.name}</Link>
                                    <div className="button-div">
                                        <button className="edit-delete" type="button" onClick={() => this.props.history.push(`/my-races/${item.id}/edit`)}>Edit</button>
                                        <button className="edit-delete" id={item.id} onClick={this.handleDelete} type="button">Delete</button>
                                    </div>

                                </li>

                            )

                        })

                    }
                </ul>
                <button type="button" className="submit" onClick={() => this.props.history.push(`/my-races/add-race`)}>Add Race</button>
            </div>

        )
    }
}