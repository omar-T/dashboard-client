import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAdmins, removeAdmin, updateAdmin} from '../store/actions/admins'
import {createAdmin} from '../store/actions/auth'
import {removeSuccess} from '../store/actions/successes'

class AdminsTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            newName: '',
            newSurname: '',
            newEmail: '',
            newPassword: ''
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

    handleAdd = () => {
        this.props.createAdmin({
            name: this.state.newName,
            surname: this.state.newSurname,
            email: this.state.newEmail,
            password: this.state.newPassword
        })
            .then(() => {
                this.setState({
                    newName: '',
                    newSurname: '',
                    newEmail: '',
                    newPassword: ''
                });
                this.props.fetchAdmins();
            })
            .catch(() => {
                return;
            });
    }

    handleUpdate = (admin_id, accessToken) => {
        this.props.updateAdmin({
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            _id: admin_id,
            accessToken
        });
    }

    render() {
        const {newName, newSurname, newEmail} = this.state;
        const {admins, successes, removeAdmin, updateAdmin} = this.props;
        let adminTDS = admins.map(admin => (
            <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>{admin.email}</td>
                <td>
                    <button className='btn btn-outline-danger mr-1' data-toggle='modal' data-target={`#deleteAdmin_${admin._id}`}>Delete</button>
                    <div className="modal fade" id={`deleteAdmin_${admin._id}`} tabIndex="-1" role="dialog" aria-labelledby="deleteAdminLabel" aria-hidden="true">
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
                    <button className='btn btn-outline-success mr-1' data-toggle='modal' data-target={`#updateAdmin_${admin._id}`}>Update</button>
                    <div className="modal fade" id={`updateAdmin_${admin._id}`} tabIndex="-1" role="dialog" aria-labelledby="updateAdminLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateAdminLabel">Update Admin Form</h5>
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
                                                    defaultValue={admin.name}
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
                                                    defaultValue={admin.surname}
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
                                                    defaultValue={admin.email}
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
                                                />
                                            </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button onClick={this.handleUpdate.bind(this, admin._id, admin.accessToken)} className="btn btn-success" data-dismiss='modal'>Update Admin</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {admin.isActive && 
                        <button className='btn btn-outline-danger mr-1' onClick={updateAdmin.bind(this, {...admin, isActive: !admin.isActive})}>Deactivate</button>
                    }
                    {!admin.isActive &&
                        <button className='btn btn-outline-warning mr-1' onClick={updateAdmin.bind(this, {...admin, isActive: !admin.isActive})}>Activate</button>
                    }
                    {admin.isSuper && 
                        <button className='btn btn-outline-dark' onClick={updateAdmin.bind(this, {...admin, isSuper: !admin.isSuper})}>Normal</button>
                    }
                    {!admin.isSuper &&
                        <button className='btn btn-outline-primary' onClick={updateAdmin.bind(this, {...admin, isSuper: !admin.isSuper})}>Super</button>
                    }
                </td>
            </tr>
        ));
        return (
            <div className='bg-light p-3'>
                {successes.message && 
                    <div className='alert alert-success mx-3'>{successes.message}</div>
                }
                <button className='btn btn-success float-right' data-toggle='modal' data-target='#addAdmin'><i className="fas fa-plus mr-2"></i> Add New Admin</button>
                <div className="modal fade" id='addAdmin' tabIndex="-1" role="dialog" aria-labelledby="addAdminLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addAdminLabel">Add Admin Form</h5>
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
                                        <div className='input-group-prepend mb-4'>
                                            <span className='input-group-text'>
                                                <i className="fas fa-lock"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='password' 
                                                placeholder='Password'
                                                name='newPassword'
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button onClick={this.handleAdd} className="btn btn-success" data-dismiss='modal'>Add Admin</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h2>Admins Table</h2>
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

export default connect(mapStateToProps, {fetchAdmins, createAdmin, removeAdmin, updateAdmin, removeSuccess})(AdminsTable);