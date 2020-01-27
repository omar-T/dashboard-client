import {GET_USER_ACTIVITY_LAST_FIVE_DAYS, GET_USER_ACTIVITY_LAST_FOUR_WEEKS} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case GET_USER_ACTIVITY_LAST_FIVE_DAYS:
            return {
                ...state,
                fiveDaysLogs: action.fiveDaysLogs
            }
        case GET_USER_ACTIVITY_LAST_FOUR_WEEKS:
            return {
                ...state,
                fourWeeksLogs: action.fourWeeksLogs
            }
        default:
            return state;
    }
}