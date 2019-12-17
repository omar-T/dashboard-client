import {apiCall} from '../../services/api'
import {LOAD_DOCS, GET_DOC} from '../actionTypes'

export const loadDocs = foundDocs => ({
    type: LOAD_DOCS,
    foundDocs
});

export const getDoc = id => ({
    type: GET_DOC,
    id
});

export const fetchDocs = (type, search, page) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `https://aislaw-dev2.herokuapp.com/search/${type}?query=${search}&page=${page}`)
                .then(res => {
                    console.log(`https://aislaw-dev2.herokuapp.com/search/${type}?query=${search}&page=${page}`);
                    console.log(res);
                    localStorage.setItem('searchData', search);
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