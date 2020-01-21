import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAdmins, removeAdmin, updateAdmin, createAdmin} from '../store/actions/admins'
import {removeSuccess} from '../store/actions/successes'
import {removeError, addError} from '../store/actions/errors'
import UpdateAdminModal from '../components/UpdateAdminModal'
import DeleteAdminModal from '../components/DeleteAdminModal'
import AddAdminModal from '../components/AddAdminModal'

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
        if(this.props.errors.message){
            setTimeout(() => {
                this.props.removeError();
            }, 4000);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAdd = (adminData) => {
        this.props.createAdmin(adminData)
            .then(() => {
                this.props.fetchAdmins();
            })
            .catch(() => {
                return;
            });
    }

    hanldeState = (admin) => {
        this.setState({
            name: admin.name,
            surname: admin.surname,
            email: admin.email
        });
    }

    handleUpdate = (admin_id, accessToken) => {
        const {name, surname, email, password} = this.state;
        this.props.updateAdmin({
            name,
            surname,
            email,
            password,
            _id: admin_id,
            accessToken
        });
        this.setState({
            name: '',
            surname: '',
            email: '',
            password: ''
        });
    }
    
    render() {
        const {name, surname, email} = this.state;
        const {admins, successes, errors, removeAdmin, updateAdmin, addError} = this.props;
        let adminTDS = admins.map(admin => (
            <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>{admin.email}</td>
                <td>
                    <button className='btn btn-outline-danger btn-sm  mr-1 mb-1 mb-lg-0' data-toggle='modal' data-target={`#deleteAdmin_${admin._id}`}>Delete</button>
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
                    <button onClick={this.hanldeState.bind(this, admin)} className='btn btn-outline-success btn-sm mr-1 mb-1 mb-lg-0' data-toggle='modal' data-target={`#updateAdmin_${admin._id}`}>Update</button>
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
                                                    value={name}
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
                                                    value={surname}
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
                                                    value={email}
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
                        <button className='btn btn-outline-danger btn-sm mr-1 mb-1 mb-lg-0' onClick={updateAdmin.bind(this, {...admin, isActive: !admin.isActive})}>Deactivate</button>
                    }
                    {!admin.isActive &&
                        <button className='btn btn-outline-warning btn-sm mr-1 mb-1 mb-lg-0' onClick={updateAdmin.bind(this, {...admin, isActive: !admin.isActive})}>Activate</button>
                    }
                    {admin.isSuper && 
                        <button className='btn btn-outline-dark btn-sm mb-1 mb-lg-0' onClick={updateAdmin.bind(this, {...admin, isSuper: !admin.isSuper})}>Normal</button>
                    }
                    {!admin.isSuper &&
                        <button className='btn btn-outline-primary btn-sm mb-1 mb-lg-0' onClick={updateAdmin.bind(this, {...admin, isSuper: !admin.isSuper})}>Super</button>
                    }
                </td>
            </tr>
        ));
        return (
            <div className='bg-light p-3'>
                {successes.message && 
                    <div className='alert alert-success mx-3'>{successes.message}</div>
                }
                {errors.message && 
                    <div className='alert alert-danger mx-3'>{errors.message}</div>
                }
                <AddAdminModal
                    onAdd={this.handleAdd}
                    addError={addError}
                />
                <h2>Admins Table</h2>
                <hr/>
                <table className='table table-responsive-xm table-hover mb-0'>
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
        successes: state.successes,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {
    fetchAdmins, 
    createAdmin, 
    removeAdmin, 
    updateAdmin, 
    removeSuccess, 
    removeError, 
    addError
})(AdminsTable);