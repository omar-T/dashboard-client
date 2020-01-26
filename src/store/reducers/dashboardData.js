import {GET_COUNT, GET_MOST_ACTIVE_USERS} from '../actionTypes'

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
        default:
            return state;
    }
}