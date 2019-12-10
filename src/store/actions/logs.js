import {apiCall} from '../../services/api'
import {addError, removeError} from '../actions/errors'
import {LOAD_LOGS} from '../actionTypes'

export const loadLogs = logs => ({
    type: LOAD_LOGS,
    logs
});

export const fetchLogs = () => {
    return dispatch => {
        return apiCall('get', '/api/logs')
            .then(res => {
                dispatch(removeError);
                dispatch(loadLogs(res));
                console.log(res);
            })
            .catch(err => {
                dispatch(addError(err));
            });
    }
}