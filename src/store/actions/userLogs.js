import {apiCall} from '../../services/api'
import {addError, removeError} from '../actions/errors'
import {GET_USER_ACTIVITY_LAST_FIVE_DAYS, GET_USER_ACTIVITY_LAST_FOUR_WEEKS} from '../actionTypes'

export const getUserActivityLastFiveDays = fiveDaysLogs => ({
    type: GET_USER_ACTIVITY_LAST_FIVE_DAYS,
    fiveDaysLogs
});

export const getUserActivityLastFourWeeks = fourWeeksLogs => ({
    type: GET_USER_ACTIVITY_LAST_FOUR_WEEKS,
    fourWeeksLogs
});

export const handleGetUserActivityLastFiveDays = (user_id) => {
    return dispatch => {
        return apiCall('post', '/api/logs/userActivityLastFiveDays', {user_id})
            .then(({fiveDaysLogs}) => {
                dispatch(getUserActivityLastFiveDays(fiveDaysLogs));
                dispatch(removeError());
            })
            .catch(err => dispatch(addError(err.message)));
    }
}

export const handleGetUserActivityLastFourWeeks = (user_id) => {
    return dispatch => {
        return apiCall('post', '/api/logs/userActivityLastFourWeeks', {user_id})
            .then(({fourWeeksLogs}) => {
                console.log(fourWeeksLogs);
                dispatch(removeError());
            })
            .catch(err => dispatch(addError(err.message)));
    }
}