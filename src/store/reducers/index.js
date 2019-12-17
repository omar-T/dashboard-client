import {combineReducers} from 'redux'
import currentAdmin from './currentAdmin'
import errors from './errors'
import successes from './successes'
import admins from './admins'
import users from './users'
import logs from './logs'
import foundDocs from './foundDocs'

const rootReducer = combineReducers({
    errors,
    successes,
    currentAdmin,
    admins,
    users,
    logs,
    foundDocs
});

export default rootReducer;