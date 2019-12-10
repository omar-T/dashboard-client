import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './Homepage.css'
import AdminsTable from './AdminsTable'
import UsersTable from './UsersTable'
import {} from '../store/actions/logs'

const Homepage = () => {
    return (
        <div className='px-4 main'>
            <Switch>
                <Route
                    exact path='/' render={(props) => (
                        <div>Weclome dashboard</div>
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

function mapStateToProps(state){
    return {
        logs: state.logs
    }
}

export default withRouter(connect(mapStateToProps, {})(Homepage));