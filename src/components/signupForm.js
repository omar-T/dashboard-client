import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class signupForm extends Component {
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state)
            .then(() => {
                this.props.history.push('/login');
            })
            .catch(() => {
                return;
            });
    }

    render() {
        const {name, surname, email, password} = this.state;
        const {errors, history, removeError} = this.props;
        if(errors.message !== null){
            const unlisten = history.listen(() => {
                removeError();
                unlisten(); // to stop listening and removing error
            })
        }
        return (
            <div className='signup'>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
                }
                <div className='row'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={this.handleSubmit}>
                                <h1>Register</h1>
                                <p className='text-muted'>Create your account</p>
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
                                        value={password}
                                    />
                                </div>
                                <div className='row mb-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-success px-4'>Sign up</button>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <p>
                                    You have an account, go  
                                    <Link to='/login'> here </Link> to login
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
