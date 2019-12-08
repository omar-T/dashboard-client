import {apiCall, setTokenHeader} from '../../services/api'
import {LOGIN_ADMIN} from '../actionTypes'
import {addError, removeError} from './errors'
import {addSuccess, removeSuccess} from './successes'

export function loginAdmin(admin){
    return {
        type: LOGIN_ADMIN,
        admin
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
                    dispatch(removeSuccess);
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
                    dispatch(removeError);
                    dispatch(addSuccess(message));
                    resolve(); // indicate the API call succeded
                })
                .catch(err => {
                    dispatch(removeSuccess);
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