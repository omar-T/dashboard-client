import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchUsers, createUser, removeUser, updateUser} from '../store/actions/users'
import {removeSuccess, addSuccess} from '../store/actions/successes'
import {removeError, addError} from '../store/actions/errors'
import Moment from 'moment'
import UpdateUserModal from '../components/UpdateUserModal'
import DeleteUserModal from '../components/DeleteUserModal'
import AddUserModal from '../components/AddUserModal'
import TablesPagination from '../components/TablesPagination'
import UserCharts from '../components/UserCharts'
class UsersTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount(){
        this.props.fetchUsers();
    }

    componentDidUpdate(){
        if(this.props.successes.message){
            setTimeout(() => {
                this.props.removeSuccess();
            }, 4000);
        }
        if(this.props.errors.message){
            setTimeout(() => {
                this.props.removeError();
            }, 4000);
        }
    }

    handleClickedPage = (pageNumber, e) => {
        e.preventDefault();
        const {fetchUsers} = this.props;
        if(pageNumber !== ''){
            return fetchUsers(pageNumber);
        }
        fetchUsers();
    }

    handleAdd = (userData) => {
        this.props.createUser(userData)
            .then(() => {
                this.props.fetchUsers();
            })
            .catch(() => {
                return;
            });
    }

    handleUpdate = (newUser) => {
        this.props.updateUser(newUser);
    }

    getDates = (diff, type) => {
        let dateLabels = [];
        const end = Moment();
        let start = Moment().subtract(diff, type);
        for(let m = start; m.diff(end, type) <= 0; m.add(1, type)){
            dateLabels.push(new Date(m));
        }
        return dateLabels;
    }

    handleUserChart = (user) => {
        this.setState({
            user
        });
    }

    render() {
        const {user} = this.state;
        const {successes, errors, removeUser, addError} = this.props;
        const {allUsers, currentPage, pages} = this.props.users;
        let userTDS = [];
        if(allUsers && allUsers.length !== 0){
            userTDS = allUsers.map(user => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>
                        <DeleteUserModal
                            user={user}
                            onDelete={removeUser}
                        />
                        <UpdateUserModal
                            user={user}
                            onUpdate={this.handleUpdate}
                            addError={addError}
                        />
                        <button onClick={this.handleUserChart.bind(this, user, user._id, user.name, user.surname)} className='btn btn-outline-info btn-sm mb-1 mb-md-0'>View Details</button>
                    </td>
                </tr>
            ));
        }
        return (
            <div>
                <div className='bg-light mb-3 p-3'>
                    {successes.message && 
                        <div className='alert alert-success mx-3'>{successes.message}</div>
                    }
                    {errors.message && 
                        <div className='alert alert-danger mx-3'>{errors.message}</div>
                    }
                    <AddUserModal
                        onAdd={this.handleAdd}
                        addError={addError}
                    />
                    <h2>Users Table</h2>
                    <hr/>
                    <div className='table-responsive mb-3'>
                        <table className='table table-hover mb-0'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {userTDS.length !== 0 ? 
                                userTDS :
                                <tr>
                                    <td colSpan='4'>
                                        <em>No Users Found</em>
                                    </td>
                                </tr>
                            }
                            </tbody>
                            
                        </table>
                    </div>
                    <TablesPagination
                        pages={pages}
                        currentPage={currentPage}
                        onClick={this.handleClickedPage}
                    />
                </div>
                <UserCharts
                    user={user}
                />
            </div>

        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users,
        logs: state.logs,
        successes: state.successes,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {
    removeSuccess, 
    addSuccess, 
    removeError, 
    addError, 
    fetchUsers, 
    createUser, 
    removeUser, 
    updateUser
})(UsersTable);