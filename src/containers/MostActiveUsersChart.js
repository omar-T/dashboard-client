import React, { Component } from 'react'
import {Bar} from 'react-chartjs-2'

export default class MostActiveUsersChart extends Component {
    setData = () => {
        let countData = this.props.users.map(u => {
            let docsCount = this.props.logs.filter(l => l.userId === u._id);
            return{
                ...u,
                count: docsCount.length
            };
        });
        countData.sort((a, b) => {
            const countA = a.count;
            const countB = b.count;
            if (countA > countB) {
                return -1;
            }
            if (countB > countA) {
                return 1;
            }
            return 0;
        });
        let activeUsers = countData.slice(0, 4);
        let labels = activeUsers.map(au => `${au.name} ${au.surname}`);
        let data = activeUsers.map(au => au.count);
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
    
    render() {
        this.setData();
        return (
            <div className='col-12 col-lg-6 mb-2 mb-lg-0'>
                <div className='bg-light p-4'>
                    <h4>Most Active Users</h4>
                    <hr/>
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
                </div>
            </div>
        )
    }
}
