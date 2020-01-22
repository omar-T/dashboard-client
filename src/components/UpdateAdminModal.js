import React, { Component, Fragment } from 'react'

export default class UpdateAdminModal extends Component {
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
        const {name, surname, email} = this.props.admin;
        this.setState({
            name,
            surname,
            email
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        const {name, surname, email, password} = this.state;
        const {admin, onUpdate, addError} = this.props;
        if(name.trim() === '' || surname.trim() === '' || email.trim() === ''){
            return addError('Please Make Sure The Fields Are Filled !');
        }

        const decode = Buffer.from(admin.accessToken, 'base64').toString();
        const [oldEmail, oldPass] = decode.split(':');
        let newAuthCred = '';
        // handling accessToken
        if(oldEmail !== email && (password !== '' && oldPass !== password)){
            newAuthCred = `${email}:${password}`;
            admin.accessToken = Buffer.from(newAuthCred).toString('base64');
        }else if(oldEmail !== email){
            newAuthCred = `${email}:${oldPass}`;
            admin.accessToken = Buffer.from(newAuthCred).toString('base64');
        }else if(password !== '' && oldPass !== password){
            newAuthCred = `${oldEmail}:${password}`;
            admin.accessToken = Buffer.from(newAuthCred).toString('base64');
        }

        const newAdmin = {
            ...admin,
            name,
            surname,
            email
        }
        onUpdate(newAdmin);
    }

    render() {
        const {name, surname, email} = this.state;
        const {admin} = this.props;
        return (
            <Fragment>
                <button className='btn btn-outline-success btn-sm mr-1 mb-1 mb-lg-0' data-toggle='modal' data-target={`#updateAdmin_${admin._id}`}>Update</button>
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
                                    <button onClick={this.handleUpdate} className="btn btn-success" data-dismiss='modal'>Update Admin</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
