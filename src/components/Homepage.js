import React from 'react'
import {Redirect} from 'react-router-dom'

const Homepage = ({currentAdmin}) => {
    if(!currentAdmin.isAuthenticated){
        return (
            <Redirect to='/login'/>
        )
    }
    return (
        <div>
            
        </div>
    );
}

export default Homepage;