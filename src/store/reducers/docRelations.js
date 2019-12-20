import {LOAD_RELATIONS, DELETE_RELATION} from '../actionTypes'

export default (state= {}, action) => {
    switch(action.type){
        case LOAD_RELATIONS:
            return {...action.relationsModel}
        case DELETE_RELATION:
            console.log(state);
            let newMevzuat = state.mevzuat.map(mev => {
                if(mev.type === action.mev_type){
                    let content = mev.content.map(cont => {
                        if(cont.mevId === action.mev_id){    
                            let newMadddeList = cont.maddeList.filter(madde => (
                                madde.id !== action.madde_id
                            ));
                            return {
                                ...cont, 
                                maddeList: [...newMadddeList]
                            }
                        }
                        return {...cont}
                    });
                    return {
                        ...mev,
                        content: [...content]
                    }
                }
                return {...mev}
            });
            console.log({...state, mevzuat: [...newMevzuat]}, ' new state');
            return {
                ...state, 
                mevzuat: [...newMevzuat]
            };
        default:
            return state;
    }
}