import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './Homepage.css'
import {fetchLogs} from '../store/actions/logs'
import {fetchUsers} from '../store/actions/users'
import AdminsTable from './AdminsTable'
import UsersTable from './UsersTable'
import FiveDaysDocChart from './FiveDaysDocChart'
import FourWeeksDocChart from './FourWeeksDocChart'
import MostActiveUsersChart from './MostActiveUsersChart'
import Doc from '../components/Doc'

class Homepage extends Component {
    componentDidMount(){
        this.props.fetchLogs();
        this.props.fetchUsers();
    }
    
    render(){
        const {logs, users} = this.props;
        return (
            <div className='px-4 main'>
                <Switch>
                    <Route
                        exact path='/' render={(props) => (
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className='card bg-light'>
                                            <div className='card-body'>
                                                <span className='float-right'><i className="fas fa-users fa-4x"></i></span>
                                                <h4 className='card-title'>Total Users</h4>
                                                <h3 className='card-text'>{users.length}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row my-3'>
                                    <FiveDaysDocChart 
                                        logs={logs} 
                                        {...props}
                                    />
                                    <FourWeeksDocChart 
                                        logs={logs} 
                                        {...props}
                                    />
                                    <MostActiveUsersChart 
                                        logs={logs} 
                                        users={users} 
                                        {...props}
                                    />
                                </div>
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
                        exact path='/docs' render={(props) => (
                            <Doc {...props}/>
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