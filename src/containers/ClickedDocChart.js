import React, { Component } from 'react'
import Moment from 'moment'
import {Line} from 'react-chartjs-2'

class LogChart extends Component {

    getDates = () => {
        let dateLabels = [];
        const end = Moment();
        let start = Moment().subtract(4, 'days');
        for(let m = start; m.diff(end, 'days') <= 0; m.add(1, 'days')){
            dateLabels.push(new Date(m));
        }
        return dateLabels;
    }

    setData = () => {
        let labels = this.getDates();
        let data = [];
        labels.forEach(d => {
            const logData = this.props.logs.filter(l => Moment(l.createdAt).format('YYYY-MM-DD') === Moment(d).format('YYYY-MM-DD'));
            data.push(logData.length);
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

    render() {
        return (
            <div className='col-12 col-lg-6 mb-2 mb-lg-0'>
                <div className='bg-light p-4'>
                    <h4>User Activity For Last 5 Days</h4>
                    <hr/>
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
                </div>
            </div>
        )
    }
}

export default LogChart;