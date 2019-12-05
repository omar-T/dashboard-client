import {combineReducers} from 'redux'
import currentUser from './currentUser'
import errors from './errors'

const rootReducer = combineReducers({
    errors,
    currentUser
});

export default rootReducer;