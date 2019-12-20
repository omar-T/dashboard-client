import axios from 'axios'
import {LOAD_RELATIONS, DELETE_RELATION} from '../actionTypes'

export const loadRelations = relationsModel => ({
    type: LOAD_RELATIONS,
    relationsModel
});

export const remove = (mev_type, mev_id, madde_id) => ({
    type: DELETE_RELATION,
    mev_type,
    mev_id,
    madde_id
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