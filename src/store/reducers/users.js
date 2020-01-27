import {LOAD_USERS, DELETE_USER, UPDATE_USER} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_USERS:
            return {...action.users};
        case DELETE_USER:
            let remainingUsers = state.allUsers.filter(user => user._id !== action.id);
            return {
                ...state,
                allUsers: remainingUsers
            }
        case UPDATE_USER:
            let updatedUsers = state.allUsers.map(user => {
                if(user._id === action.user._id){
                    return {...action.user};
                }
                return {...user}
            });
            return {
                ...state,
                allUsers: updatedUsers
            };
        default:
            return state;
    }
}