import React from 'react'
import RaceContext from './RaceContext'
import { Link } from 'react-router-dom'


export default class MyRaceList extends React.Component {
    static contextType = RaceContext
    render() {

        return (
            <div>
                <ul>
                    {this.context.races.map((item, i) => {
                        return (
                            <li key={`my-race-${i}`}>
                                <Link to={`/my-races/${item.id}/view`}>{item.name}</Link>
                                <button type="button" onClick={()=>this.props.history.push(`/my-races/${item.id}/edit`)}>Edit</button>
                                <button type="button">Delete</button>
                            </li>

                        )

                    })
                    }
                </ul>
                <button type="button" onClick={()=>this.props.history.push(`/my-races/add-race`)}>Add Race</button>
            </div>

        )
    }
}