import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchUsers, createUser, removeUser, updateUser} from '../store/actions/users'
import {removeSuccess, addSuccess} from '../store/actions/successes'
import {removeError, addError} from '../store/actions/errors'
import {Line} from 'react-chartjs-2'
import Moment from 'moment'
import UpdateUserModal from '../components/UpdateUserModal'
import DeleteUserModal from '../components/DeleteUserModal'
import AddUserModal from '../components/AddUserModal'
import TablesPagination from '../components/TablesPagination'
class UsersTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataFiveDays: {},
            dataFourWeeks: {},
            chartOwner: ''
        }
    }

    componentDidMount(){
        this.props.fetchUsers();
    }

    componentDidUpdate(){
        if(this.props.successes.message){
            setTimeout(() => {
                this.props.removeSuccess();
            }, 4000);
        }
        if(this.props.errors.message){
            setTimeout(() => {
                this.props.removeError();
            }, 4000);
        }
    }

    handleClickedPage = (pageNumber, e) => {
        e.preventDefault();
        const {fetchUsers} = this.props;
        if(pageNumber !== ''){
            return fetchUsers(pageNumber);
        }
        fetchUsers();
    }

    handleAdd = (userData) => {
        this.props.createUser(userData)
            .then(() => {
                this.props.fetchUsers();
            })
            .catch(() => {
                return;
            });
    }

    handleUpdate = (newUser) => {
        this.props.updateUser(newUser);
    }

    getDates = (diff, type) => {
        let dateLabels = [];
        const end = Moment();
        let start = Moment().subtract(diff, type);
        for(let m = start; m.diff(end, type) <= 0; m.add(1, type)){
            dateLabels.push(new Date(m));
        }
        return dateLabels;
    }

    handleUserChart = (user_id, userName, userSurname) => {
        let labels = this.getDates(4, 'days');
        let labels2 = this.getDates(4, 'weeks');
        
        let userLogs = this.props.logs.filter(l => l.userId === user_id);

        let docsCount = labels.map(d => {
            const logCount = userLogs.filter(l => Moment(l.createdAt).format('YYYY-MM-DD') === Moment(d).format('YYYY-MM-DD'));
            return logCount.length
        });

        let docsCount2 = labels2.map((d, i, dates) => {
            let count = 0;
            userLogs.forEach(l => {
                if(Moment(l.createdAt).isBetween(Moment(d), Moment(dates[i+1]))){
                    count++;
                }
            });
            return count;
        });
        
        let data = {
            labels,
            datasets: [
                {
                    label: 'Document Count',
                    borderColor: 'rgba(190, 229, 235, 1)',
                    backgroundColor: 'rgba(190, 229, 235, 0.2)',
                    data: docsCount
                }
            ]
        }

        let data2 = {
            labels: labels2,
            datasets: [
                {
                    label: 'Document Count',
                    borderColor: 'rgba(190, 229, 235, 1)',
                    backgroundColor: 'rgba(190, 229, 235, 0.2)',
                    data: docsCount2
                }
            ]
        }

        this.setState({
            dataFiveDays: data,
            dataFourWeeks: data2,
            chartOwner: `${userName} ${userSurname}`
        });
    }

    render() {
        const {dataFiveDays, dataFourWeeks, chartOwner} = this.state;
        const {successes, errors, removeUser, addError} = this.props;
        const {allUsers, currentPage, pages} = this.props.users;
        let userTDS = [];
        if(allUsers && allUsers.length !== 0){
            userTDS = allUsers.map(user => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>
                        <DeleteUserModal
                            user={user}
                            onDelete={removeUser}
                        />
                        <UpdateUserModal
                            user={user}
                            onUpdate={this.handleUpdate}
                            addError={addError}
                        />
                        <button onClick={this.handleUserChart.bind(this, user._id, user.name, user.surname)} className='btn btn-outline-info btn-sm mb-1 mb-md-0'>View Details</button>
                    </td>
                </tr>
            ));
        }
        return (
            <div>
                <div className='bg-light mb-3 p-3'>
                    {successes.message && 
                        <div className='alert alert-success mx-3'>{successes.message}</div>
                    }
                    {errors.message && 
                        <div className='alert alert-danger mx-3'>{errors.message}</div>
                    }
                    <AddUserModal
                        onAdd={this.handleAdd}
                        addError={addError}
                    />
                    <h2>Users Table</h2>
                    <hr/>
                    <div className='table-responsive mb-3'>
                        <table className='table table-hover mb-0'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {userTDS.length !== 0 ? 
                                userTDS :
                                <tr>
                                    <td colSpan='4'>
                                        <em>No Users Found</em>
                                    </td>
                                </tr>
                            }
                            </tbody>
                            
                        </table>
                    </div>
                    <TablesPagination
                        pages={pages}
                        currentPage={currentPage}
                        onClick={this.handleClickedPage}
                    />
                </div>
                <div className='bg-light p-3 mb-3'>
                    <h4>Details for {chartOwner}</h4>
                </div>
                <div className='row'>
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
                    <div className='col-12 col-lg-6 mb-2 mb-lg-0'>
                        <div className='p-4 bg-light'>
                            <h5>Activity For Last 4 Weeks</h5>
                            <hr/>
                            <Line
                                id='mostActiveTimes'
                                data={dataFourWeeks}
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
                </div>
            </div>

        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users,
        logs: state.logs,
        successes: state.successes,
        errors: state.errors
    }
}

export default connect(mapStateToProps, {
    removeSuccess, 
    addSuccess, 
    removeError, 
    addError, 
    fetchUsers, 
    createUser, 
    removeUser, 
    updateUser
})(UsersTable);