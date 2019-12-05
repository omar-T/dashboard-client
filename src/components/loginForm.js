import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class loginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
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
                this.props.history.push('/');
            })
            .catch(() => {
                return;
            });
    }

    render() {
        const {email} = this.state;
        const {errors, history, removeError} = this.props;
        return (
            <div className='login'>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
                }
                <div className='row'>
                    <div className='card '>
                        <div className='card-body'>
                            <form onSubmit={this.handleSubmit}>
                                <h1>Login</h1>
                                <p className='text-muted'>Sign In to your account</p>
                                
                                <div className='input-group-prepend mb-3'>
                                    <span className='input-group-text'>
                                        <i className="far fa-user"></i>
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
                                <div className='row mb-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-primary px-4'>Login</button>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <p>
                                    You don't have an account ? register 
                                    <Link to='/signup'> here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
