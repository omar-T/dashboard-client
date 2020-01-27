import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleGetUsersCount} from '../store/actions/dashboardData'
import FiveDaysDocChart from './FiveDaysDocChart'
import FourWeeksDocChart from './FourWeeksDocChart'
import MostActiveUsersChart from './MostActiveUsersChart'

class Dashboard extends Component {
    componentDidMount(){
        const {dashboardData, handleGetUsersCount} = this.props;
        if(dashboardData.usersCount === undefined){
            handleGetUsersCount();
        }
    }

    render() {
        const {dashboardData} = this.props;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-4'>
                        <div className='card bg-light'>
                            <div className='card-body'>
                                <span className='float-right'><i className="fas fa-users fa-3x"></i></span>
                                <h4 className='card-title'>Total Users</h4>
                                <h5 className='card-text'>{dashboardData.usersCount}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row my-3'>
                    <FiveDaysDocChart 
                        {...this.props}
                    />
                    <FourWeeksDocChart 
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
        dashboardData: state.dashboardData
    }
}

export default connect(mapStateToProps, {handleGetUsersCount})(Dashboard);