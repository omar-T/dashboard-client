import {LOAD_DOCS, GET_MEV_DOC, ADD_MEV_INDEX} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_DOCS:
            return {...action.foundDocs};
        case GET_MEV_DOC:
            return {...state, mevDoc: action.mevDoc}
        case ADD_MEV_INDEX:
            console.log(action.maddeObj);
            console.log(action.maddeIndex);
            break;
        default:
            return state;
    }
}