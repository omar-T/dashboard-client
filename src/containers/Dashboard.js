import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchLogs} from '../store/actions/logs'
import {handleGetUsersCount} from '../store/actions/dashboardData'
import FiveDaysDocChart from '../components/FiveDaysDocChart'
import FourWeeksDocChart from '../components/FourWeeksDocChart'
import MostActiveUsersChart from '../components/MostActiveUsersChart'

class Dashboard extends Component {
    componentDidMount(){
        const {handleGetUsersCount, fetchLogs} = this.props;
        fetchLogs();
        handleGetUsersCount();
    }

    render() {
        const {dashboardData, logs} = this.props;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-4'>
                        <div className='card bg-light'>
                            <div className='card-body'>
                                <span className='float-right'><i className="fas fa-users fa-4x"></i></span>
                                <h4 className='card-title'>Total Users</h4>
                                <h3 className='card-text'>{dashboardData.usersCount}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row my-3'>
                    <FiveDaysDocChart 
                        {...this.props}
                    />
                    <FourWeeksDocChart 
                        logs={logs} 
                        {...this.props}
                    />
                    <MostActiveUsersChart 
                        {...this.props}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        dashboardData: state.dashboardData,
        logs: state.logs
    }
}

export default connect(mapStateToProps, {handleGetUsersCount, fetchLogs})(Dashboard);