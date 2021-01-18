import React from 'react'
import RaceContext from './RaceContext'


export default class LoginForm extends React.Component {
    static contextType = RaceContext

    handleSubmit = (e) => {
        e.preventDefault()
        this.context.handleLogin()
        this.props.history.push('/my-races')
    }

    render(){
        return (<form className='login-form' onSubmit={this.handleSubmit}>
            <input type='text' placeholder="username"></input>
            <input type="password" placeholder="password"></input>
            <button type="submit">Log in</button>
        </form>)
    }
}