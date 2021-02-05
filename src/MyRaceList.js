import React from 'react'
import './MyRaceList.css'
import RacesService from './services/races-service'
import { Link } from 'react-router-dom'


export default class MyRaceList extends React.Component {
    

    state = {myRaces:[]}

    async componentDidMount(){
        this.setState({myRaces: await RacesService.getMyRaces()})
    }

    handleDelete = (e)=>{
        const races = [...this.state.myRaces]
        RacesService.deleteRace(e.target.id)
        .then(
            () => {
                
                this.setState({myRaces: races.filter(race=>{
                    
                    return parseInt(race.id)!==parseInt(e.target.id)
                
                })})
            }
        )
        
    }
    render() {

        return (
            <div>
                <ul>
                    {this.state.myRaces.map((item, i) => {
                        return (
                            <li className="race-link" key={`my-race-${i}`}>
                                <Link to={`/my-races/${item.id}/view`}>{item.name}</Link>
                                <button className="edit-delete" type="button" onClick={()=>this.props.history.push(`/my-races/${item.id}/edit`)}>Edit</button>
                                <button className="edit-delete" id={item.id} onClick={this.handleDelete} type="button">Delete</button>
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