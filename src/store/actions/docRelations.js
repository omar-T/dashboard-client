import axios from 'axios'
import {LOAD_RELATIONS, EMPTY_DOC_RELATIONS, ADD_RELATION, DELETE_RELATION, UPDATE_RELATION} from '../actionTypes'

export const loadRelations = relationsModel => ({
    type: LOAD_RELATIONS,
    relationsModel
});

export const add = (newIctihatRel) => ({
    type: ADD_RELATION,
    newIctihatRel
});

export const remove = (mev_type, mev_id, madde_id) => ({
    type: DELETE_RELATION,
    mev_type,
    mev_id,
    madde_id
});

export const update = (updatedIctihatRel) => ({
    type: UPDATE_RELATION,
    updatedIctihatRel
})

export const emptyDocRelations = () => ({
    type: EMPTY_DOC_RELATIONS
});

export const fetchRelationsModel = (docId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return axios.get(`https://relation-adalethanim.herokuapp.com/relation/ictihat/${docId}`)
                .then(res => {
                    console.log(res.data);
                    dispatch(loadRelations(res.data));
                    resolve();
                })
                .catch(err => {
                    console.log(err.response.data.msg);
                    reject(err.response.data.msg);
                });
        });
    }
}

export const addRelation = (docId, newIctihatRel) => {
    return dispatch => {
        console.log(newIctihatRel);
        return new Promise((resolve, reject) => {
            return axios.post(`http://localhost:4000/relation/ictihat/${docId}`, newIctihatRel)
                .then(res => {
                    console.log(res);
                    dispatch(add(newIctihatRel));
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject();
                });
        });
    }
}

export const removeRelation = (docId, mev_type, mev_id, madde_id) => {
    return dispatch => {
        console.log(docId);
        return new Promise((resolve, reject) => {
            return axios.get(`https://relation-adalethanim.herokuapp.com/relation/ictihat/${docId}`)
                .then(res => {
                    dispatch(remove(mev_type, mev_id, madde_id));
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject();
                });
        });
    }
}

export const updateRelation = (docId, newMev) => {
    return dispatch => {
        console.log('from update ', newMev);
        return new Promise((resolve, reject) => {
            return axios.put(`http://localhost:4000/relation/ictihat/${docId}`, newMev)
                .then(res => {
                    console.log('from update res: ', res);
                    dispatch(update(res.data));
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                    reject();
                });
        });
    }
}