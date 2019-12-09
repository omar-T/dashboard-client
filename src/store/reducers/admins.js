import {LOAD_ADMINS, DELETE_ADMIN, UPDATE_ADMIN} from '../actionTypes'

export default (state = [], action) => {
    switch(action.type){
        case LOAD_ADMINS:
            return [...action.admins];
        case DELETE_ADMIN:
            return state.filter(admin => admin._id !== action.id);
        case UPDATE_ADMIN:
            let admins = state.map(admin => {
                if(admin._id === action.admin._id){
                    return admin = {...action.admin};
                }
                return {...admin}
            })
            return admins;
        default:
            return state;
    }
}