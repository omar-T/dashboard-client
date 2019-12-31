import {apiCall} from '../../services/api'
// import axios from 'axios' 
import {LOAD_DOCS, GET_MEV_DOC, SAVE_MEV_DOC} from '../actionTypes'
import {app_config} from '../../config'

export const loadDocs = foundDocs => ({
    type: LOAD_DOCS,
    foundDocs
});

export const getMevzuatDoc = mevDoc => ({
    type: GET_MEV_DOC,
    mevDoc
});

export const saveMevDoc = mevDoc => ({
    type: SAVE_MEV_DOC,
    mevDoc
});

export const fetchDocs = (type, search, page) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `${app_config.api_url}/search/${type}?query=${search}&page=${page}`)
                .then(res => {
                    // console.log(`https://aislaw-dev2.herokuapp.com/search/${type}?query=${search}&page=${page}`);
                    // console.log(res);
                    localStorage.setItem('searchData', search);
                    dispatch(loadDocs(res));
                    resolve();
                })
                .catch(err => {
                    // console.log(err);
                    reject();
                });
        });
    }
}

export const handleGetMevzuatDoc = (docId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `${app_config.api_url}/docs/dev/mevzuat/${docId}`)
                .then(res => {
                    // console.log(res.response);
                    dispatch(getMevzuatDoc(res.response));
                    resolve();
                })
                .catch(err => {
                    // console.log(err);
                    reject();
                });
        });
    }
}

export const handleSaveMevDoc = (mevDoc) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('put', `http://localhost:4500/mevzuat/${mevDoc.id}`, mevDoc)
                .then(res => {
                    // console.log(res);
                    dispatch(saveMevDoc(res));
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}