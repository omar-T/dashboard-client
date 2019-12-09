import {combineReducers} from 'redux'
import currentAdmin from './currentAdmin'
import errors from './errors'
import successes from './successes'
import admins from './admins'

const rootReducer = combineReducers({
    errors,
    successes,
    currentAdmin,
    admins
});

export default rootReducer;