import React from 'react'
import {Link} from 'react-router-dom'
import RaceContext from './RaceContext'


export default function PrivateNavBar(props){
    return (
        <RaceContext.Consumer>
            {context => 
            <div>
                <Link to="/races">Search Races</Link>
                <Link to="/my-races">My Races</Link>
                <Link to='/' onClick={this.context.handleLogout}>Logout</Link>

            </div>
            }
        </RaceContext.Consumer>
        
            
        
    )
}