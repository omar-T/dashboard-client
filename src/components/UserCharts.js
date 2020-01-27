import React, { Fragment } from 'react'
import FiveDaysUserActivity from '../containers/FiveDaysUserActivity'
import FourWeekssUserActivity from '../containers/FourWeeksUserActivity'

const UserCharts = ({chartOwner, dataFiveDays, dataFourWeeks}) => {
    return (
        <Fragment>
            <div className='bg-light p-3 mb-3'>
                <h4>Details for {chartOwner}</h4>
            </div>
            <div className='row'>
                <FiveDaysUserActivity
                    dataFiveDays={dataFiveDays}
                />
                <FourWeekssUserActivity
                    dataFourWeeks={dataFourWeeks}
                />
            </div>

        </Fragment>
    )
}

export default UserCharts;