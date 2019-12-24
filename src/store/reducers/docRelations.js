import {LOAD_RELATIONS, EMPTY_DOC_RELATIONS, ADD_RELATION, DELETE_RELATION} from '../actionTypes'

export default (state = {}, action) => {
    switch(action.type){
        case LOAD_RELATIONS:
            return {...action.relationsModel}
        case EMPTY_DOC_RELATIONS:
            return {}
        case ADD_RELATION:
            const {docId, mevDoc, maddeId, maddeTitle} = action;
            console.log(state);
            let mevzuat = [{
                type: mevDoc.type,
                content: [{
                    mevId: mevDoc.id,
                    mevName: mevDoc.name,
                    maddeList: [{
                        id: maddeId,
                        title: maddeTitle
                    }]
                }]
            }];
            if(Object.keys(state).length === 0){
                console.log(mevzuat, ' from addRelation reducer');
                return {
                    ...state,
                    iliskili_karar: [],
                    mevzuat,
                    relID: docId
                }
            }
            let foundMevzuat = state.mevzuat.find(mev => mev.type === mevDoc.type);
            if(foundMevzuat){
                let foundContent = foundMevzuat.content.find(cont => cont.mevId === mevDoc.id);
                if(foundContent){
                    let newMevzuat = state.mevzuat.map(mev => {
                        if(mev.type === mevDoc.type){
                            let newContent = mev.content.map(cont => {
                                if(cont.mevId === mevDoc.id){
                                    cont.maddeList.push({
                                        id: maddeId,
                                        title: maddeTitle
                                    });
                                    return {...cont};
                                }
                                return {...cont};
                            });
                            return {
                                ...mev, 
                                content: [...newContent]
                            }
                        }
                        return {...mev}
                    });
                    console.log('NEW MEVZUAT: ', newMevzuat);
                    console.log('New State', {
                        ...state,
                        mevzuat: [...newMevzuat]
                    });
                    return {
                        ...state,
                        mevzuat: [...newMevzuat]
                    }
                }
                console.log('FOUND MEVZUAT: ', foundMevzuat);
                let newMevzuat = state.mevzuat.map(mev => {
                    if(mev.type === mevDoc.type){
                        return {
                            ...mev,
                            content: [
                                ...mev.content,
                                {
                                    mevId: mevDoc.id,
                                    mevName: mevDoc.name,
                                    maddeList: [{
                                        id: maddeId,
                                        title: maddeTitle
                                    }]
                                }
                            ]
                        }
                    }
                    return {...mev};
                });
                return {
                    ...state,
                    mevzuat: [...newMevzuat]
                }
            }
            return {
                ...state,
                mevzuat: [...state.mevzuat, ...mevzuat],
            };
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