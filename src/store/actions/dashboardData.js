import {apiCall} from '../../services/api'
import {addError, removeError} from '../actions/errors'
import {GET_COUNT, GET_MOST_ACTIVE_USERS} from '../actionTypes'

export const getUserCount = usersCount => ({
    type: GET_COUNT,
    usersCount
})

export const getMostActiveUsers = usersData => ({
    type: GET_MOST_ACTIVE_USERS,
    usersData
})

export const handleGetUsersCount = () => {
    return dispatch => {
        return apiCall('get', '/api/users/count')
            .then(({usersCount}) => {
                dispatch(getUserCount(usersCount));
                dispatch(removeError());
            })
            .catch(err => dispatch(addError(err.message)));
    }
}

export const handleGetMostActiveUsers = () => {
    return dispatch => {
        return apiCall('get', '/api/logs/mostActiveUsers')
            .then(({usersData}) => {
                dispatch(getMostActiveUsers(usersData));
                dispatch(removeError());
            })
            .catch(err => dispatch(addError(err.message)));
    }
}