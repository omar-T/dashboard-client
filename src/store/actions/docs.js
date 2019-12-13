import {apiCall} from '../../services/api'
import {LOAD_DOCS, GET_DOC} from '../actionTypes'

export const loadDocs = ictihatDocs => ({
    type: LOAD_DOCS,
    ictihatDocs
});

export const getDoc = id => ({
    type: GET_DOC,
    id
});

export const fetchDocs = (search, page) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `https://aislaw-dev2.herokuapp.com/search/ictihat?query=${search}&page=${page}`)
                .then(res => {
                    dispatch(loadDocs(res));
                    resolve();
                })
                .catch(err => {
                    console.log(err)
                    reject();
                });
        });
    }
}