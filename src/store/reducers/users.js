import {LOAD_USERS, DELETE_USER, UPDATE_USER} from '../actionTypes'

export default (state = [], action) => {
    switch(action.type){
        case LOAD_USERS:
            return [...action.users];
        case DELETE_USER:
            return state.filter(user => user._id !== action.id);
        case UPDATE_USER:
            let updatedUsers = state.map(user => {
                if(user._id === action.user._id){
                    return user = {...action.user};
                }
                return {...user}
            });
            return updatedUsers;
        default:
            return state;
    }
}