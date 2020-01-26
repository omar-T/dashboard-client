import React, {Component} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import './Homepage.css'
import AdminsTable from './AdminsTable'
import UsersTable from './UsersTable'
import Dashboard from '../containers/Dashboard'
import Doc from './Doc'
import IctihatDocsEdit from './IctihatDocsEdit'
import MevzuatDocsEdit from './MevzuatDocsEdit'

class Homepage extends Component {
    render(){
        return (
            <div className='px-4 main'>
                <Switch>
                    <Route
                        exact path='/' render={(props) => (
                            <Dashboard {...props}/>
                        )}
                    />
                    <Route
                        exact path='/admins' render={(props) => (
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
                    <Route
                        path='/docs/:docId' render={(props) => {
                            const {type} = this.props.location.state;
                            // console.log(type);
                            if(type === 'ictihat'){
                                return <IctihatDocsEdit {...props}/>
                            }else{
                                return <MevzuatDocsEdit {...props}/>
                            }
                        }}
                    />
                </Switch>
            </div>
        );
    }
}



export default withRouter(Homepage);