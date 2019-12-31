import axios from 'axios'
import {LOAD_RELATIONS, EMPTY_DOC_RELATIONS, ADD_RELATION, DELETE_RELATION, UPDATE_RELATION} from '../actionTypes'
import {app_config} from '../../config'

export const loadRelations = relationsModel => ({
    type: LOAD_RELATIONS,
    relationsModel
});

export const add = (newIctihatRel) => ({
    type: ADD_RELATION,
    newIctihatRel
});

export const remove = () => ({
    type: DELETE_RELATION
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
            return axios.get(`${app_config.rel_api_url}/relation/ictihat/${docId}`)
                .then(res => {
                    // console.log(res.data);
                    dispatch(loadRelations(res.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err.response.data.msg);
                    reject(err.response.data.msg);
                });
        });
    }
}

export const addRelation = (docId, newIctihatRel) => {
    return dispatch => {
        // console.log(newIctihatRel);
        return new Promise((resolve, reject) => {
            return axios.post(`${app_config.rel_api_url}/relation/ictihat/${docId}`, newIctihatRel)
                .then(res => {
                    // console.log(res);
                    dispatch(add(newIctihatRel));
                    resolve();
                })
                .catch(err => {
                    // console.log(err);
                    reject(err);
                });
        });
    }
}

export const removeRelation = (docId) => {
    return dispatch => {
        // console.log(docId);
        return new Promise((resolve, reject) => {
            return axios.delete(`${app_config.rel_api_url}/relation/ictihat/${docId}`)
                .then(res => {
                    dispatch(remove());
                    resolve();
                })
                .catch(err => {
                    // console.log(err);
                    reject(err);
                });
        });
    }
}

export const updateRelation = (docId, newMev) => {
    return dispatch => {
        // console.log('from update ', newMev);
        return new Promise((resolve, reject) => {
            return axios.put(`${app_config.rel_api_url}/relation/ictihat/${docId}`, newMev)
                .then(res => {
                    // console.log('from update res: ', res);
                    dispatch(update(res.data));
                    resolve();
                })
                .catch(err => {
                    // console.log(err);
                    reject(err);
                });
        });
    }
}