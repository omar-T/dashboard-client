import React from 'react'
import {Redirect} from 'react-router-dom'

const Homepage = ({currentAdmin}) => {
    if(!currentAdmin.isAuthenticated){
        return (
            <Redirect to='/login'/>
        )
    }
    return (
        <div className='px-4 main'>
            <div className='d-flex justify-content-between'>
                <div>
                    Hi
                </div>
                <div>
                    admin
                </div>
                <div>
                    daashboar
                </div>
            </div>
           welcome Home !
        </div>
    );
}

export default Homepage;