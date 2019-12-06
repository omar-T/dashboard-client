import React from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Homepage from '../components/Homepage'
import LoginForm from '../components/loginForm'
import SignupForm from '../components/signupForm'
import {signinAdmin, createAdmin} from '../store/actions/auth'
import {removeError} from '../store/actions/errors'

const Main = props => {
    const {signinAdmin, createAdmin, errors, removeError, currentAdmin} = props;
    return (
        <div>
            <Switch>
                <Route 
                    exact path='/' render={props => 
                        <Homepage currentAdmin={currentAdmin} {...props}/>
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
        </div>
    );
}

function mapStateToProps(state){
    return {
        currentAdmin: state.currentAdmin,
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, {signinAdmin, createAdmin, removeError})(Main));