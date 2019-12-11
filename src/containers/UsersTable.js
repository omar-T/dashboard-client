import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchUsers, createUser, removeUser, updateUser} from '../store/actions/users'
import {removeSuccess} from '../store/actions/successes'
import {Line} from 'react-chartjs-2'
import Moment from 'moment'
class UsersTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            newName: '',
            newSurname: '',
            newEmail: '',
            name: '',
            surname: '',
            email: '',
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
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAdd = () => {
        const {newName, newSurname, newEmail} = this.state;
        this.props.createUser({
            name: newName,
            surname: newSurname,
            email: newEmail
        })
            .then(() => {
                this.setState({
                    newName: '',
                    newSurname: '',
                    newEmail: ''
                });
                this.props.fetchUsers();
            })
            .catch(() => {
                return;
            });
    }

    hanldeState = (user) => {
        this.setState({
            name: user.name,
            surname: user.surname,
            email: user.email
        });
    }

    handleUpdate = (user_id) => {
        const {name, surname, email} = this.state;
        this.props.updateUser({
            name,
            surname,
            email,
            _id: user_id
        });
        this.setState({
            name: '',
            surname: '',
            email: ''
        });
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
        const {name, surname, email, newName, newSurname, newEmail, dataFiveDays, dataFourWeeks, chartOwner} = this.state;
        const {users, successes, removeUser} = this.props;
        let userTDS = users.map(user => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>
                    <button className='btn btn-outline-danger mr-1 mb-1 mb-md-0' data-toggle='modal' data-target={`#deleteUser_${user._id}`}>Delete</button>
                    <div className="modal fade" id={`deleteUser_${user._id}`} tabIndex="-1" role="dialog" aria-labelledby="deleteUserLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="deleteUserLabel">WARNING</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this User ?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-dismiss='modal' onClick={removeUser.bind(this, user._id)}>Delete User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.hanldeState.bind(this, user)} className='btn btn-outline-success mr-1 mb-1 mb-md-0' data-toggle='modal' data-target={`#updateUser_${user._id}`}>Update</button>
                    <div className="modal fade" id={`updateUser_${user._id}`} tabIndex="-1" role="dialog" aria-labelledby="updateUserLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateUserLabel">Update User Form</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body">
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text'>
                                                <i className="far fa-user"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='text' 
                                                placeholder='Name'
                                                name='name'
                                                required
                                                onChange={this.handleChange}
                                                value={name}
                                            />
                                        </div>
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text'>
                                                <i className="far fa-user"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='text' 
                                                placeholder='Surname'
                                                name='surname'
                                                required
                                                onChange={this.handleChange}
                                                value={surname}
                                            />
                                        </div>
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text email'>
                                                <i className="far fa-envelope-open"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='email' 
                                                placeholder='Email'
                                                name='email'
                                                required
                                                onChange={this.handleChange}
                                                value={email}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button onClick={this.handleUpdate.bind(this, user._id)} className="btn btn-success" data-dismiss='modal'>Update User</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.handleUserChart.bind(this, user._id, user.name, user.surname)} className='btn btn-outline-info mb-1 mb-md-0'>View Details</button>
                </td>
            </tr>
        ));
        return (
            <div>
                <div className='bg-light mb-3 p-3'>
                    {successes.message && 
                        <div className='alert alert-success mx-3'>{successes.message}</div>
                    }
                    <button className='btn btn-success float-right' data-toggle='modal' data-target='#addUser'><i className="fas fa-plus mr-2"></i> Add New User</button>
                    <div className="modal fade" id='addUser' tabIndex="-1" role="dialog" aria-labelledby="addUserLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addUserLabel">Add User Form</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body">
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text'>
                                                <i className="far fa-user"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='text' 
                                                placeholder='Name'
                                                name='newName'
                                                required
                                                onChange={this.handleChange}
                                                value={newName}
                                            />
                                        </div>
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text'>
                                                <i className="far fa-user"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='text' 
                                                placeholder='Surname'
                                                name='newSurname'
                                                required
                                                onChange={this.handleChange}
                                                value={newSurname}
                                            />
                                        </div>
                                        <div className='input-group-prepend mb-3'>
                                            <span className='input-group-text email'>
                                                <i className="far fa-envelope-open"></i>
                                            </span>
                                            <input 
                                                className='form-control' 
                                                type='email' 
                                                placeholder='Email'
                                                name='newEmail'
                                                required
                                                onChange={this.handleChange}
                                                value={newEmail}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button onClick={this.handleAdd} className="btn btn-success" data-dismiss='modal'>Add User</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <h2>Users Table</h2>
                    <hr/>
                    <table className='table table-responsive-sm table-hover mb-0'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTDS}
                        </tbody>
                    </table>
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
        successes: state.successes
    }
}

export default connect(mapStateToProps, {removeSuccess, fetchUsers, createUser, removeUser, updateUser})(UsersTable);