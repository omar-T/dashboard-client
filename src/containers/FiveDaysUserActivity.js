import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'

class FiveDaysUserActivity extends Component {
    

    render() {
        const {dataFiveDays} = this.props;
        return (
            <div className='col-12 col-lg-6 mb-2 mb-lg-0'>
                <div className='p-4 bg-light'>
                    <h5>Activity For Last 5 Days</h5>
                    <hr/>
                    <Line
                        data={dataFiveDays}
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

export default FiveDaysUserActivity;