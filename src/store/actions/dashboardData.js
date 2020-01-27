import {apiCall} from '../../services/api'
import {addError, removeError} from '../actions/errors'
import {
    GET_COUNT, 
    GET_MOST_ACTIVE_USERS, 
    GET_ACTIVITY_LAST_FIVE_DAYS, 
    GET_ACTIVITY_LAST_FOUR_WEEKS
} from '../actionTypes'

export const getUserCount = usersCount => ({
    type: GET_COUNT,
    usersCount
})

export const getMostActiveUsers = usersData => ({
    type: GET_MOST_ACTIVE_USERS,
    usersData
})

export const getActivityLastFiveDays = fiveDaysLogs => ({
    type: GET_ACTIVITY_LAST_FIVE_DAYS,
    fiveDaysLogs
});

export const getActivityLastFourWeeks = fourWeeksLogs => ({
    type: GET_ACTIVITY_LAST_FOUR_WEEKS,
    fourWeeksLogs
});

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

export const handleGetActivityLastFiveDays = () => {
    return dispatch => {
        return apiCall('get', '/api/logs/activityLastFiveDays')
            .then(({fiveDaysLogs}) => {
                dispatch(getActivityLastFiveDays(fiveDaysLogs));
                dispatch(removeError());
            })
            .catch(err => dispatch(addError(err.message)));
    }
}

export const handleGetActivityLastFourWeeks = () => {
    return dispatch => {
        return apiCall('get', '/api/logs/activityLastFourWeeks')
            .then(({fourWeeksLogs}) => {
                dispatch(getActivityLastFourWeeks(fourWeeksLogs));
                dispatch(removeError());
            })
            .catch(err => dispatch(addError(err.message)));
    }
}