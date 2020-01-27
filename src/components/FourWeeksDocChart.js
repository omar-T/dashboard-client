import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleGetActivityLastFourWeeks} from '../store/actions/dashboardData'
import {Line} from 'react-chartjs-2'

class FourWeeksDocChart extends Component {
    componentDidMount(){
        const {handleGetActivityLastFourWeeks} = this.props;
        handleGetActivityLastFourWeeks();
    }

    setData = () => {
        const {dashboardData} = this.props;
        if(dashboardData.fourWeeksLogs !== undefined){
            let labels = [];
            let data = [];
            dashboardData.fourWeeksLogs.forEach(log => {
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
    }

    render() {
        const {dashboardData} = this.props;
        return (
            <div className='col-12 col-lg-6 col-xl-4 mb-2 mb-lg-0'>
                <div className='bg-light p-4'>
                    <h5>Users Activity For Last 4 Weeks</h5>
                    <hr/>
                    {dashboardData.fourWeeksLogs !== undefined && 
                        <Line 
                            data={this.setData}
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

export default connect(mapStateToProps, {handleGetActivityLastFourWeeks})(FourWeeksDocChart);