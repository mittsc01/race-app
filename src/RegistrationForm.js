import React from 'react'


export default class RegistrationForm extends React.Component {

    render(){
        return (
        <form className="registration-form">
            <label htmlFor="user-name">Username</label>
            <input type="text" name="user-name"/>
            <label htmlFor="pswd">Password</label>
            <input type="password" name="pswd"/>
            <label htmlFor="repeat-pswd">Repeat Password</label>
            <input type="password" name="repeat-pswd"/>
            <button type="submit">Register</button>
        </form>
            )
    }
}