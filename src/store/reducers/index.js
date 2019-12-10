import {combineReducers} from 'redux'
import currentAdmin from './currentAdmin'
import errors from './errors'
import successes from './successes'
import admins from './admins'
import users from './users'
import logs from './logs'

const rootReducer = combineReducers({
    errors,
    successes,
    currentAdmin,
    admins,
    users,
    logs
});

export default rootReducer;