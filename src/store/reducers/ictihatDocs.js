import {LOAD_DOCS, GET_DOC} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_DOCS:
            return {...action.ictihatDocs};
        case GET_DOC:
            let doc = this.state.ictihatDocs.docs.find(doc => doc.karar_id === action.id);
            return {...state, doc}
        default:
            return state;
    }
}