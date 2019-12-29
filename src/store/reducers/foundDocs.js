import {LOAD_DOCS, GET_MEV_DOC, SAVE_MEV_DOC} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_DOCS:
            return {...action.foundDocs};
        case GET_MEV_DOC:
            return {...state, mevDoc: action.mevDoc}
        case SAVE_MEV_DOC:
            return {...state, mevDoc: action.mevDoc}
        default:
            return state;
    }
}