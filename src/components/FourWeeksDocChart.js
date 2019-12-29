import React, { Component } from 'react'
import Moment from 'moment'
import {Line} from 'react-chartjs-2'

export default class FourWeeksDocChart extends Component {
    getDates = (diff, type) => {
        let dateLabels = [];
        const end = Moment();
        let start = Moment().subtract(diff, type);
        for(let m = start; m.diff(end, type) <= 0; m.add(1, type)){
            dateLabels.push(new Date(m));
        }
        return dateLabels;
    }

    setData = () => {
        let labels = this.getDates(4, 'weeks');
        let data = labels.map((d, i, dates) => {
            let count = 0;
            this.props.logs.forEach(l => {
                if(Moment(l.createdAt).isBetween(Moment(d), Moment(dates[i+1]))){
                    count++;
                }
            });
            return count;
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
            <div className='col-12 col-lg-6 col-xl-4 mb-2 mb-lg-0'>
                <div className='bg-light p-4'>
                    <h4>Users Activity For Last 4 Weeks</h4>
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
