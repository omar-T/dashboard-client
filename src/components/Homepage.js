import React from 'react'
import {Redirect} from 'react-router-dom'

const Homepage = ({currentAdmin}) => {
    if(!currentAdmin.isAuthenticated){
        debugger
        return (
            <Redirect to='/login'/>
        )
    }
    return (
        <div>Welcome to the dashboard!</div>
    );
}

export default Homepage;