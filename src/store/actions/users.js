import {apiCall} from '../../services/api'
import {addError, removeError} from '../actions/errors'
import {addSuccess, removeSuccess} from '../actions/successes'
import {LOAD_USERS, DELETE_USER, UPDATE_USER} from '../actionTypes'

export const loadUsers = users => ({
    type: LOAD_USERS,
    users
});

export const remove = id => ({
    type: DELETE_USER,
    id
});

export const update = user => ({
    type: UPDATE_USER,
    user
});

export const fetchUsers = () => {
    return dispatch => {
        return apiCall('get', '/api/users')
            .then(res => dispatch(loadUsers(res)))
            .catch(err => dispatch(addError(err.message)));
    }
}

export const createUser = (userData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', '/api/users', userData)
                .then(({message}) => {
                    dispatch(removeError());
                    dispatch(addSuccess(message));
                    resolve();
                })
                .catch(err => {
                    dispatch(removeSuccess());
                    dispatch(addError(err.message));
                    reject();
                })
        })
    }
}

export const removeUser = (user_id) => {
    return dispatch => {
        return apiCall('delete', `/api/users/${user_id}`)
            .then(({success}) => {
                dispatch(remove(user_id));
                dispatch(addSuccess(success.message));
            })
            .catch(err => dispatch(addError(err.message)));
    }
}

export const updateUser = (user) => {
    return dispatch => {
        return apiCall('put', `/api/users/${user._id}`, user)
            .then(({updatedUser, success}) => {
                dispatch(update(updatedUser));
                dispatch(addSuccess(success.message));
                dispatch(removeError());
            })
            .catch(err => {
                dispatch(removeSuccess());
                dispatch(addError(err.message));
            });
    }
}
