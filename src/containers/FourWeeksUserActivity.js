import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2'
import {handleGetUserActivityLastFourWeeks} from '../store/actions/userLogs'
class FourWeeksUserActivity extends Component {
    componentDidUpdate(prevProps){
        const {user_id, handleGetUserActivityLastFourWeeks} = this.props;
        if(user_id && prevProps.user_id !== user_id){
            handleGetUserActivityLastFourWeeks(user_id);
        }
    }

    setData = () => {
        const {userLogs} = this.props;
        let labels = [];
        let data = [];
        userLogs.fourWeeksLogs.forEach(log => {
            labels.push(log.date);
            data.push(log.count);
        });
        return {
            labels,
            datasets: [
                {
                    label: 'Document Count',
                    borderColor: 'rgba(190, 229, 235, 1)',
                    backgroundColor: 'rgba(190, 229, 235, 0.2)',
                    data
                }
            ]
        }
    }

    render(){
        const {userLogs} = this.props;
        return (
            <div className='col-12 col-lg-6 mb-2 mb-lg-0'>
                <div className='p-4 bg-light'>
                    <h5>Activity For Last 4 Weeks</h5>
                    <hr/>
                    <Line
                        id='mostActiveTimes'
                        data={userLogs.fourWeeksLogs ? this.setData : {}}
                        options={{
                            responsive: true,
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        drawOnChartArea: false
                                    },
                                    display: true,
                                    type: 'time',
                                    distribution: 'series',
                                    time: {
                                        tooltipFormat: 'DD-MM-YYYY',
                                        unit: 'day',
                                        stepSize: 1,
                                        displayFormats: {
                                            day: 'DD MMM'
                                        }
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 5
                                    }
                                }]
                            }
                        }}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        userLogs: state.userLogs
    }
}

export default connect(mapStateToProps, {handleGetUserActivityLastFourWeeks})(FourWeeksUserActivity);