import React, { Component, Fragment } from 'react'

export default class AddUserModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAdd = (e) => {
        e.preventDefault();
        const {onAdd, addError} = this.props;
        const {name, surname, email} = this.state;
        if(name.trim() === '' || surname.trim() === '' || email.trim() === ''){
            return addError('Please Make Sure The Fields Are Filled !');
        }
        onAdd(this.state);
    }

    render() {
        const {name, surname, email} = this.state;
        return (
            <Fragment>
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
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button onClick={this.handleAdd} className="btn btn-success" data-dismiss='modal'>Add User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
