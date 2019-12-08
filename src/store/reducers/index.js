import {combineReducers} from 'redux'
import currentAdmin from './currentAdmin'
import errors from './errors'
import successes from './successes'

const rootReducer = combineReducers({
    errors,
    successes,
    currentAdmin
});

export default rootReducer;