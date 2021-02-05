import React from 'react'

import RacesService from './services/races-service'

export default class RaceList {

    state = {
        races: []
    }

    async componentDidMount(){
         this.setState({races: await RacesService.getAllRaces()})
    }

    render() {
        console.log(this.state.races)
        return (
            
            <div>
                {this.state.races.map(item => {
                    return (
                        <Link to={`/races/${item.id}`}>{item.name}</Link>
                    )

                })
                }
            </div>
        )
    }
}