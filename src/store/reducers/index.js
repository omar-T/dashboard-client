import {combineReducers} from 'redux'
import errors from './errors'
import successes from './successes'
import currentAdmin from './currentAdmin'
import dashboardData from './dashboardData'
import admins from './admins'
import users from './users'
import userLogs from './userLogs'
import foundDocs from './foundDocs'
import docRelations from './docRelations'

const rootReducer = combineReducers({
    errors,
    successes,
    currentAdmin,
    dashboardData,
    admins,
    users,
    userLogs,
    foundDocs,
    docRelations
});

export default rootReducer;