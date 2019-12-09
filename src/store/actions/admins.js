import {apiCall} from '../../services/api'
import {addError, removeError} from '../actions/errors'
import {addSuccess, removeSuccess} from '../actions/successes'
import {LOAD_ADMINS, DELETE_ADMIN, UPDATE_ADMIN} from '../actionTypes'

export const loadAdmins = admins => ({
    type: LOAD_ADMINS,
    admins
});

export const remove = id => ({
    type: DELETE_ADMIN,
    id
});

export const update = admin => ({
    type: UPDATE_ADMIN,
    admin
});

export const fetchAdmins = () => {
    return dispatch => {
        return apiCall('get', '/api/admins')
            .then(res => dispatch(loadAdmins(res)))
            .catch(err => dispatch(addError(err.message)));
    }
}

export const removeAdmin = (admin_id) => {
    return dispatch => {
        return apiCall('delete', `/api/admins/${admin_id}`)
            .then(({success}) => {
                dispatch(remove(admin_id));
                dispatch(addSuccess(success.message));
            })
            .catch(err => dispatch(addError(err.message)));
    }
}

export const updateAdmin = (admin) => {
    return dispatch => {
        console.log(admin);
        return apiCall('put', `/api/admins/${admin._id}`, admin)
            .then(({updatedAdmin, success}) => {
                dispatch(update(updatedAdmin));
                dispatch(addSuccess(success.message));
                dispatch(removeError);
            })
            .catch(err => {
                dispatch(removeSuccess);
                dispatch(addError(err.message));
            })
    }
}