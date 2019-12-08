import React from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import LoginForm from '../components/loginForm'
import SignupForm from '../components/signupForm'
import {signinAdmin, createAdmin} from '../store/actions/auth'
import {removeError} from '../store/actions/errors'

const Main = props => {
    const {signinAdmin, createAdmin, errors, removeError, currentAdmin} = props;
    return (
        <Switch>
            <Route 
                exact path='/' render={() => 
                    <Redirect to='/login'/>
                }
            />
            <Route
                exact path='/login' render={props => {
                    return(
                        <LoginForm
                            removeError={removeError}
                            errors={errors}
                            onAuth={signinAdmin}
                            {...props}
                        />
                    );
                }}
            />
            <Route
                exact path='/signup' render={props => {
                    return(
                        <SignupForm
                            message={currentAdmin.message}
                            removeError={removeError}
                            errors={errors}
                            onAuth={createAdmin}
                            {...props}
                        />
                    );
                }}
            />
        </Switch>
    );
}

function mapStateToProps(state){
    return {
        currentAdmin: state.currentAdmin,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {signinAdmin, createAdmin, removeError})(Main));