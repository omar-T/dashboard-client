import {LOAD_RELATIONS, DELETE_RELATION} from '../actionTypes'

export default (state= {}, action) => {
    switch(action.type){
        case LOAD_RELATIONS:
            return {...action.relationsModel}
        case DELETE_RELATION:
            console.log(state);
            let isMevEmpty = false;
            let newMevzuat = state.mevzuat.map(mev => {
                if(mev.type === action.mev_type){
                    let isContEmpty = false;
                    let content = mev.content.map(cont => {
                        if(cont.mevId === action.mev_id){    
                            let newMadddeList = cont.maddeList.filter(madde => (
                                madde.id !== action.madde_id
                            ));
                            if(newMadddeList.length === 0){
                                isContEmpty = true;
                            }
                            return {
                                ...cont, 
                                maddeList: [...newMadddeList]
                            }
                        }
                        return {...cont}
                    });
                    if(isContEmpty){
                        content = content.filter(cont => cont.mevId !== action.mev_id);
                        console.log(content.length, 'content length');
                    }
                    if(content.length === 0){
                        isMevEmpty = true;
                    }
                    return {
                        ...mev,
                        content: [...content]
                    }
                }
                return {...mev}
            });
            if(isMevEmpty){
                console.log(isMevEmpty);
                newMevzuat = newMevzuat.filter(mev => mev.type !== action.mev_type);
            }
            console.log({...state, mevzuat: [...newMevzuat]}, ' new state');
            return {
                ...state, 
                mevzuat: [...newMevzuat]
            };
        default:
            return state;
    }
}