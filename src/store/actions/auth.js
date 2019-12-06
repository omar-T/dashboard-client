import {apiCall, setTokenHeader} from '../../services/api'
import {LOGIN_ADMIN, SIGNUP_ADMIN} from '../actionTypes'
import {addError, removeError} from './errors'

export function loginAdmin(admin){
    return {
        type: LOGIN_ADMIN,
        admin
    }
}

export function signupAdmin(message){
    return {
        type: SIGNUP_ADMIN,
        message
    }
}

export function setAuthorizationToken(token){
    setTokenHeader(token);
}

export function signinAdmin(adminData){
    return dispatch => {
        // wrap our thunk in a promise so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall('post', 'api/auth/signin', adminData)
                .then(({token, ...admin}) => {
                    localStorage.setItem('jwtToken', token);
                    setAuthorizationToken(token);
                    dispatch(loginAdmin(admin));
                    dispatch(removeError);
                    resolve(); // indicate the API call succeded
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject(); // indicate the API call failed
                });
        });
    }
}

export function createAdmin(adminData){
    return dispatch => {
        // wrap our thunk in a promise so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall('post', 'api/auth/signup', adminData)
                .then(({message}) => {
                    dispatch(signupAdmin(message));
                    dispatch(removeError);
                    resolve(); // indicate the API call succeded
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject(); // indicate the API call failed
                });
        });
    }
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(loginAdmin({}));
    }
}