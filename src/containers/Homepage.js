import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './Homepage.css'
import AdminsTable from './AdminsTable'
import UsersTable from './UsersTable'
import ClickedDocChart from './ClickedDocChart'
import MostActiveUsersChart from './MostActiveUsersChart'
import {fetchLogs} from '../store/actions/logs'
import {fetchUsers} from '../store/actions/users'

class Homepage extends Component {
    componentDidMount(){
        this.props.fetchLogs();
        this.props.fetchUsers();
    }
    
    render(){
        const {logs, users} = this.props;
        console.log(users);
        return (
            <div className='px-4 main'>
                <Switch>
                    <Route
                        exact path='/' render={(props) => (
                            <div className='row'>
                                <ClickedDocChart 
                                    logs={logs} 
                                    {...props}
                                />
                                <MostActiveUsersChart 
                                    logs={logs} 
                                    users={users} 
                                    {...props}
                                />
                            </div>
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
}

function mapStateToProps(state){
    return {
        logs: state.logs,
        users: state.users
    }
}

export default withRouter(connect(mapStateToProps, {fetchLogs, fetchUsers})(Homepage));