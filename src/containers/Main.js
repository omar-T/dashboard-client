import React from 'react'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import LoginForm from '../components/loginForm'
import SignupForm from '../components/signupForm'
import {signinAdmin, createAdmin} from '../store/actions/auth'
import {removeError} from '../store/actions/errors'
import {removeSuccess} from '../store/actions/successes'

const Main = props => {
    const {signinAdmin, createAdmin, removeError, removeSuccess, errors, successes} = props;
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
                            removeSuccess={removeSuccess}
                            successes={successes}
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
        errors: state.errors,
        successes: state.successes
    }
}

export default withRouter(connect(mapStateToProps, {signinAdmin, createAdmin, removeError, removeSuccess})(Main));