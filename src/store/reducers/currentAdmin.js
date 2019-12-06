import {LOGIN_ADMIN, SIGNUP_ADMIN} from '../actionTypes'

const DEFAULT_STATE = {
    isAuthenticated: false, // will be true, when logged in
    admin: {}, // all the admin info when logged in
    message: ''
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case LOGIN_ADMIN:
            return {
                isAuthenticated: !!Object.keys(action.admin).length,
                admin: action.admin
            }
        case SIGNUP_ADMIN:
            return {
                ...state,
                message: action.message
            }
        default:
            return state;
    }
}