import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleGetActivityLastFiveDays} from '../store/actions/dashboardData'
import {Line} from 'react-chartjs-2'

class LogChart extends Component {
    componentDidMount(){
        const {dashboardData, handleGetActivityLastFiveDays} = this.props;
        if(dashboardData.fiveDaysLogs === undefined){
            handleGetActivityLastFiveDays();
        }
    }

    setData = () => {
        const {dashboardData} = this.props;
        if(dashboardData.fiveDaysLogs !== undefined){
            let labels = [];
            let data = [];
            dashboardData.fiveDaysLogs.forEach(log => {
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
                    <h5>Users Activity For Last 5 Days</h5>
                    <hr/>
                    {dashboardData.fiveDaysLogs !== undefined && 
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

export default connect(mapStateToProps, {handleGetActivityLastFiveDays})(LogChart);