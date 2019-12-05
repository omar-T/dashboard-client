import {combineReducers} from 'redux'
import currentAdmin from './currentAdmin'
import errors from './errors'

const rootReducer = combineReducers({
    errors,
    currentAdmin
});

export default rootReducer;