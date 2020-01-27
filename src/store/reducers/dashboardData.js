import {
    GET_COUNT, 
    GET_MOST_ACTIVE_USERS, 
    GET_ACTIVITY_LAST_FIVE_DAYS,
    GET_ACTIVITY_LAST_FOUR_WEEKS
} from '../actionTypes'

export default (state={}, action) => {
    switch(action.type){
        case GET_COUNT:
            return {
                ...state,
                usersCount: action.usersCount
            }
        case GET_MOST_ACTIVE_USERS:
            return {
                ...state,
                usersData: action.usersData
            }
        case GET_ACTIVITY_LAST_FIVE_DAYS:
            return {
                ...state,
                fiveDaysLogs: action.fiveDaysLogs
            }
        case GET_ACTIVITY_LAST_FOUR_WEEKS:
            return {
                ...state,
                fourWeeksLogs: action.fourWeeksLogs
            }
        default:
            return state;
    }
}