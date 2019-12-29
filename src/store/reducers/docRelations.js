import {LOAD_RELATIONS, EMPTY_DOC_RELATIONS, ADD_RELATION, DELETE_RELATION, UPDATE_RELATION} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_RELATIONS:
            return {...action.relationsModel}
        case EMPTY_DOC_RELATIONS:
            return {}
        case ADD_RELATION:
            return {...action.newIctihatRel}
        case DELETE_RELATION:
            return {}
        case UPDATE_RELATION:
            return {...action.updatedIctihatRel}
        default:
            return state;
    }
}