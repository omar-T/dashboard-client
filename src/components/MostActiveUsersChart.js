import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleGetMostActiveUsers} from '../store/actions/dashboardData'
import {Bar} from 'react-chartjs-2'

class MostActiveUsersChart extends Component {
    componentDidMount(){
        const {handleGetMostActiveUsers} = this.props;
        handleGetMostActiveUsers();
    }
    
    setData = () => {
        const {dashboardData} = this.props;
        if(dashboardData.usersData !== undefined){
            let labels = [];
            let data = [];
            dashboardData.usersData.forEach(user => {
                labels.push(`${user.name} ${user.surname}`);
                data.push(user.count);
            });
            return {
                labels,
                datasets: [
                    {
                        label: 'Clicked Docs Count',
                        backgroundColor: 'rgba(0, 153, 255, 0.85)',
                        data
                    }
                ]
            }
        }
    }
    
    render() {
        const {dashboardData} = this.props;
        return (
            <div className='col-12 col-lg-6 col-xl-4 mb-2 mb-lg-0'>
                <div className='bg-light p-4'>
                    <h4>Most Active Users</h4>
                    <hr/>
                    {dashboardData.usersData !== undefined && 
                        <Bar
                            data={this.setData}
                            options={{
                                responsive: true,
                                scales: {
                                    xAxes: [{
                                        gridLines: {
                                            drawOnChartArea: false
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            maxTicksLimit: 6
                                        }
                                    }]
                                }
                            }}
                        />
                    }
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

export default connect(mapStateToProps, {handleGetMostActiveUsers})(MostActiveUsersChart);