import React, { Component, Fragment } from 'react'

export default class AddAdminModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: ''
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
        const {name, surname, email, password} = this.state;
        if(name.trim() === '' || surname.trim() === '' || email.trim() === '' || password.trim() === ''){
            return addError('Please Make Sure The Fields Are Filled !');
        }
        const authCreds = `${email}:${password}`;
        const accessToken = Buffer.from(authCreds).toString('base64');
        onAdd({
            name,
            surname,
            email,
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
        return (
            <Fragment>
                <button className='btn btn-success btn-sm float-right' data-toggle='modal' data-target='#addAdmin'><i className="fas fa-plus mr-2"></i> Add New Admin</button>
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
                                                defaultValue={surname}
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
                                                defaultValue={email}
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
                                    <button onClick={this.handleAdd} className="btn btn-success" data-dismiss='modal'>Add Admin</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
