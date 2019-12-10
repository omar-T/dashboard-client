import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchLogs} from '../store/actions/logs'
import Moment from 'moment'
import {Line} from 'react-chartjs-2'

class LogChart extends Component {
    componentDidMount(){
        this.props.fetchLogs();
    }

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
            console.log(Moment(d).format('YYYY-MM-DD'));
            const logData = this.props.logs.filter(l => Moment(l.createdAt).format('YYYY-MM-DD') === Moment(d).format('YYYY-MM-DD'));
            // console.log(logData.length);
            data.push(logData.length);
        });
        return {
            labels,
            datasets: [
                {
                    label: 'Log Count',
                    borderColor: 'rgba(190, 229, 235, 1)',
                    backgroundColor: 'rgba(190, 229, 235, 0.1)',
                    data
                }
            ]
        }
    }

    render() {
        // this.setData();
        return (
            <div className='container bg-light p-4'>
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
                                    maxTicksLimit: 5
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        logs: state.logs
    }
}

export default connect(mapStateToProps, {fetchLogs})(LogChart);