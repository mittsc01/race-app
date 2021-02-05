import React from 'react'
import {Link} from 'react-router-dom'


export default function PublicNavBar(props){
    return (
        <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </>
    )
}