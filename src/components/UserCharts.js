import React, { Fragment } from 'react'
import FiveDaysUserActivity from '../containers/FiveDaysUserActivity'
import FourWeekssUserActivity from '../containers/FourWeeksUserActivity'

const UserCharts = ({user, dataFiveDays, dataFourWeeks}) => {
    return (
        <Fragment>
            <div className='bg-light p-3 mb-3'>
                <h4>
                    Details for {Object.keys(user).length !== 0 && `${user.name} ${user.surname}`}
                </h4>
            </div>
            <div className='row'>
                <FiveDaysUserActivity
                    user_id={user._id}
                    dataFiveDays={dataFiveDays}
                />
                <FourWeekssUserActivity
                    user_id={user._id}
                    dataFourWeeks={dataFourWeeks}
                />
            </div>

        </Fragment>
    )
}

export default UserCharts;