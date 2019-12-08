import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import './Homepage.css'

const Homepage = () => {
    return (
        <div className='px-4 main'>
            <Switch>
                <Route
                    exact path='/' render={() => (
                        <div>Weclome dashboard</div>
                    )}
                />
                <Route
                    exact path='/admins' render={() => (
                        <div>Weclome admins</div>
                    )}
                />
                <Route
                    exact path='/users' render={() => (
                        <div>Weclome users</div>
                    )}
                />
                <Route
                    exact path='/docs' render={() => (
                        <div>Weclome docs</div>
                    )}
                />
            </Switch>
        </div>
    );
}

export default withRouter(Homepage);