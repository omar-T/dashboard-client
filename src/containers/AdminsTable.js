import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAdmins, removeAdmin, updateAdmin, createAdmin} from '../store/actions/admins'
import {removeSuccess} from '../store/actions/successes'
import {removeError, addError} from '../store/actions/errors'
import UpdateAdminModal from '../components/UpdateAdminModal'
import DeleteAdminModal from '../components/DeleteAdminModal'
import AddAdminModal from '../components/AddAdminModal'

class AdminsTable extends Component {
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

    handleAdd = (adminData) => {
        this.props.createAdmin(adminData)
            .then(() => {
                this.props.fetchAdmins();
            })
            .catch(() => {
                return;
            });
    }

    handleUpdate = (newAdmin) => {
        this.props.updateAdmin(newAdmin);
    }
    
    render() {
        const {admins, successes, errors, removeAdmin, updateAdmin, addError} = this.props;
        let adminTDS = admins.map(admin => (
            <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.surname}</td>
                <td>{admin.email}</td>
                <td>
                    <DeleteAdminModal
                        admin={admin}
                        onDelete={removeAdmin}
                    />
                    <UpdateAdminModal
                        admin={admin}
                        onUpdate={this.handleUpdate}
                        addError={addError}
                    />
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