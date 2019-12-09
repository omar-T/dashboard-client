import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAdmins, removeAdmin, updateAdmin} from '../store/actions/admins'
import {removeSuccess} from '../store/actions/successes'

class AdminsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        this.props.fetchAdmins();
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

    handleSubmit = (e) => {
        e.preventDefault();
        
    }

    render() {
        const {name, surname, email, password} = this.state;
        const {admins, successes, removeAdmin, updateAdmin} = this.props;
        let adminTDS = admins.map(admin => (
            <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>{admin.email}</td>
                <td>
                    <button className='btn btn-outline-danger mr-3' data-toggle='modal' data-target='#deleteAdmin'>Delete</button>
                    <div className="modal fade" id="deleteAdmin" tabIndex="-1" role="dialog" aria-labelledby="deleteAdminLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteAdminLabel">WARNING</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this admin ?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-dismiss='modal' onClick={removeAdmin.bind(this, admin._id)}>Delete Admin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-outline-success mr-3' data-toggle='modal' data-target='#updateAdmin'>Update</button>
                    <div className="modal fade" id="updateAdmin" tabIndex="-1" role="dialog" aria-labelledby="updateAdminLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateAdminLabel">Update Admin Form</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.handleSubmit}>
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
                                                    value={name || admin.name}
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
                                                    value={surname || admin.surname}
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
                                                    value={email || admin.email}
                                                />
                                            </div>
                                            <div className='input-group-prepend mb-4'>
                                                <span className='input-group-text'>
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                                <input 
                                                    className='form-control' 
                                                    type='password' 
                                                    placeholder='Password'
                                                    name='password'
                                                    required
                                                    onChange={this.handleChange}
                                                    value={password}
                                                />
                                            </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button className="btn btn-success" data-dismiss='modal'>Update Admin</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {admin.isActive && 
                        <button className='btn btn-outline-danger' onClick={updateAdmin.bind(this, {...admin, isActive: !admin.isActive})}>Deactivate</button>
                    }
                    {!admin.isActive &&
                        <button className='btn btn-outline-warning' onClick={updateAdmin.bind(this, {...admin, isActive: !admin.isActive})}>Activate</button>
                    }
                </td>
            </tr>
        ));
        return (
            <div className='bg-light p-3'>
                {successes.message && 
                    <div className='alert alert-success mx-3'>{successes.message}</div>
                }
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
                        {adminTDS}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        admins: state.admins,
        successes: state.successes
    }
}

export default connect(mapStateToProps, {fetchAdmins, removeAdmin, updateAdmin, removeSuccess})(AdminsTable);