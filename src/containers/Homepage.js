import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import './Homepage.css'
import AdminsTable from './AdminsTable'
import UsersTable from './UsersTable'
import LogChart from './LogChart'

const Homepage = () => {
    return (
        <div className='px-4 main'>
            <Switch>
                <Route
                    exact path='/' render={(props) => (
                        <LogChart {...props}/>
                    )}
                />
                <Route
                    path='/admins' render={(props) => (
                        <AdminsTable {...props}/>
                    )}
                />
                <Route
                    exact path='/users' render={(props) => (
                        <UsersTable {...props}/>
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