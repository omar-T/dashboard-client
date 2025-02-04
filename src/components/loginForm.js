import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class loginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            message: ''
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

    componentDidMount(){
        if(this.props.successes.message){
            setTimeout(() => {
                this.props.removeSuccess()
            }, 4000);
        }
    }

    render() {
        const {email} = this.state;
        const {errors, successes, history, removeError, removeSuccess} = this.props;
        if(errors.message !== null){
            const unlisten = history.listen(() => {
                removeError();
                unlisten(); // to stop listening and removing error
            })
        }
        if(successes.message !== null){
            const unlisten = history.listen(() => {
                removeSuccess();
                unlisten(); // to stop listening and removing success
            })
        }
        return (
            <div className='login'>
                {errors.message && 
                    <div className='alert alert-danger'>{errors.message}</div>
                }
                {successes.message && 
                    <div className='alert alert-success'>{successes.message}</div>
                }
                <div className='row'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={this.handleSubmit}>
                                <h1>Login</h1>
                                <p className='text-muted'>Sign In to your account</p>
                                
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
                                <div className='row mb-3'>
                                    <div className='col-6'>
                                        <button className='btn btn-primary px-4'>Login</button>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <p>
                                    You don't have an account ? Register 
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