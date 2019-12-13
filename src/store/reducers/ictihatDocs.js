import {LOAD_DOCS, GET_DOC} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_DOCS:
            return {...action.ictihatDocs};
        case GET_DOC:
            return {...state, doc: action.doc}
        default:
            return state;
    }
}