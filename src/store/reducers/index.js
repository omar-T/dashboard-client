import {combineReducers} from 'redux'
import currentAdmin from './currentAdmin'
import errors from './errors'
import successes from './successes'
import admins from './admins'
import users from './users'
import logs from './logs'
import ictihatDocs from './ictihatDocs'

const rootReducer = combineReducers({
    errors,
    successes,
    currentAdmin,
    admins,
    users,
    logs,
    ictihatDocs
});

export default rootReducer;