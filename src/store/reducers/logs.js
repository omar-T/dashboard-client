import {LOAD_LOGS} from '../actionTypes'

export default (state = [], action) => {
    switch(action.type){
        case LOAD_LOGS:
            return [...action.logs]
        default:
            return state;
    }
}