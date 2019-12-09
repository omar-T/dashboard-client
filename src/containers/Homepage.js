import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import './Homepage.css'
import AdminsTable from './AdminsTable'

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
                    path='/admins' render={(props) => {
                        return (
                            <AdminsTable {...props}/>
                        )
                    }}
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