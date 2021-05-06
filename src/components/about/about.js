import React, {useContext} from 'react'
import RaceContext from '../../RaceContext'
import './about.css'
import AuthApiService from '../../services/auth-api-service'
export default function About(props){
    const context = useContext(RaceContext)
    const logIn = () => {
        AuthApiService.postLogin({
            user_name: 'demo',
            password: 'password',
          })
            .then(res => {
              
              context.handleLogin()
              props.history.push('/my-races')
            })
            .catch(res => {
              
              
            
            })
    }
    return (
        <div className="about-view">
            <h1>Race Director</h1>
            <p>Welcome to the Race Director App.  Register to begin creating races with some basic information.</p>
            <p>Go to My Races to manage your races and results. Go to Races to search for races by name.</p>
    <p>To try out a demo, click 'Go': <button onClick={() => logIn()}>Go</button></p>
        </div>
    )
}