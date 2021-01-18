import React from 'react'
import RaceContext from './RaceContext'

export default function RaceList(props) {
    return (
        <div>
            {props.races.map(item => {
                return (
                    <Link to={`/races/${item.id}`}>{item.name}</Link>
                )

            })
            }
        </div>
    )
}