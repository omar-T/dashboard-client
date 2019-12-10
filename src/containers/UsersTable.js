import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchUsers, createUser, removeUser, updateUser} from '../store/actions/users'
import {removeSuccess} from '../store/actions/successes'

class UsersTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            newName: '',
            newSurname: '',
            newEmail: ''
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
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAdd = () => {
        this.props.createUser({
            name: this.state.newName,
            surname: this.state.newSurname,
            email: this.state.newEmail
        })
            .then(() => {
                this.setState({
                    newName: '',
                    newSurname: '',
                    newEmail: ''
                });
                this.props.fetchUsers();
            })
            .catch(() => {
                return;
            });
    }

    handleUpdate = (user_id) => {
        this.props.updateUser({
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            _id: user_id
        });
    }

    render() {
        const {newName, newSurname, newEmail} = this.state;
        const {users, successes, removeUser} = this.props;
        let userTDS = users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>
                    <button className='btn btn-outline-danger mr-3' data-toggle='modal' data-target={`#deleteUser_${user._id}`}>Delete</button>
                    <div className="modal fade" id={`deleteUser_${user._id}`} tabIndex="-1" role="dialog" aria-labelledby="deleteUserLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteUserLabel">WARNING</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this User ?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-dismiss='modal' onClick={removeUser.bind(this, user._id)}>Delete User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-outline-success mr-3' data-toggle='modal' data-target={`#updateUser_${user._id}`}>Update</button>
                    <div className="modal fade" id={`updateUser_${user._id}`} tabIndex="-1" role="dialog" aria-labelledby="updateUserLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateUserLabel">Update User Form</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body">
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text'>
                                                <i className="far fa-user"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='text' 
                                                placeholder='Name'
                                                name='name'
                                                required
                                                onChange={this.handleChange}
                                                defaultValue={user.name}
                                            />
                                        </div>
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text'>
                                                <i className="far fa-user"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='text' 
                                                placeholder='Surname'
                                                name='surname'
                                                required
                                                onChange={this.handleChange}
                                                defaultValue={user.surname}
                                            />
                                        </div>
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text email'>
                                                <i className="far fa-envelope-open"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='email' 
                                                placeholder='Email'
                                                name='email'
                                                required
                                                onChange={this.handleChange}
                                                defaultValue={user.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button onClick={this.handleUpdate.bind(this, user._id)} className="btn btn-success" data-dismiss='modal'>Update User</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        ));
        return (
            <div className='bg-light p-3'>
                {successes.message && 
                    <div className='alert alert-success mx-3'>{successes.message}</div>
                }
                <button className='btn btn-success float-right' data-toggle='modal' data-target='#addUser'><i className="fas fa-plus mr-2"></i> Add New User</button>
                <div className="modal fade" id='addUser' tabIndex="-1" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addUserLabel">Add User Form</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form>
                                <div className="modal-body">
                                    <div className='input-group-prepend mb-3'>
                                        <span className='input-group-text'>
                                            <i className="far fa-user"></i>
                                        </span>
                                        <input 
                                            className='form-control' 
                                            type='text' 
                                            placeholder='Name'
                                            name='newName'
                                            required
                                            onChange={this.handleChange}
                                            value={newName}
                                        />
                                    </div>
                                    <div className='input-group-prepend mb-3'>
                                        <span className='input-group-text'>
                                            <i className="far fa-user"></i>
                                        </span>
                                        <input 
                                            className='form-control' 
                                            type='text' 
                                            placeholder='Surname'
                                            name='newSurname'
                                            required
                                            onChange={this.handleChange}
                                            defaultValue={newSurname}
                                        />
                                    </div>
                                    <div className='input-group-prepend mb-3'>
                                        <span className='input-group-text email'>
                                            <i className="far fa-envelope-open"></i>
                                        </span>
                                        <input 
                                            className='form-control' 
                                            type='email' 
                                            placeholder='Email'
                                            name='newEmail'
                                            required
                                            onChange={this.handleChange}
                                            defaultValue={newEmail}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button onClick={this.handleAdd} className="btn btn-success" data-dismiss='modal'>Add User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h2>Users Table</h2>
                <hr/>
                <table className='table table-responsive-sm table-hover mb-0'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTDS}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users,
        successes: state.successes
    }
}

export default connect(mapStateToProps, {removeSuccess, fetchUsers, createUser, removeUser, updateUser})(UsersTable);