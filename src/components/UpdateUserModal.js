import React, { Component, Fragment } from 'react'

export default class UpdateUserModal extends Component {
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

    componentDidMount(){
        const {name, surname, email} = this.props.user;
        this.setState({
            name,
            surname,
            email
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const {name, surname, email} = this.state;
        const {user, onUpdate, addError} = this.props;
        if(name.trim() === '' || surname.trim() === '' || email.trim() === ''){
            return addError('Please Make Sure The Fields Are Filled !');
        }

        const newUser = {
            ...user,
            name,
            surname,
            email
        }
        onUpdate(newUser);
    }

    render() {
        const {name, surname, email} = this.state;
        const {user} = this.props;
        return (
            <Fragment>
                <button className='btn btn-outline-success mr-1 mb-1 mb-md-0' data-toggle='modal' data-target={`#updateUser_${user._id}`}>Update</button>
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
                                    <button onClick={this.handleUpdate} className="btn btn-success" data-dismiss='modal'>Update User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
