import React, { Component } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../store/actions/auth'

class Navbar extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
    }

    handleCollapse = (e) => {
        document.getElementById('sidebar').classList.toggle('active');
    }
    
    render() {
        const {currentAdmin} = this.props;
        return (
            <div>
            {currentAdmin.isAuthenticated && 
                <div className='wrapper'>
                    <nav id='sidebar'>
                        <div className='sidebar-header'>
                            <h3>Welcome {currentAdmin.admin.name}</h3>
                        </div>
                        <ul className='list-unstyled components'>
                            <li>
                                <Link to='/'>Dashboard</Link>
                            </li>
                            {currentAdmin.admin.isSuper && 
                                <div>
                                    <li>
                                        <Link to='/admins'>Admins</Link>
                                    </li>
                                    <li>
                                        <Link to='/users'>Users</Link>
                                    </li>
                                </div>
                            }
                            <li>
                                <Link to='/docs'>Docs</Link>
                            </li>
                        </ul>
                    </nav>
                    
                    <div id='content'>
                        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                            <ul className='navbar-nav'>
                                <li>
                                    <button onClick={this.logout} className='btn btn-dark'>Logout</button>
                                </li>
                            </ul>
                            <div className='container-fluid'>
                                <button type="button" onClick={this.handleCollapse} id="sidebarCollapse" class="btn btn-light">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
            }
            {/* <div className='row'>
                <nav className='navbar navbar-expand-sm navbar-dark bg-dark sidebar col-sm-2'>
                    <div className='sidebar-sticky'>
                        <div className='collapse navbar-collapse' id='navbarText'>
                            <ul className='navbar-nav flex-column'>
                                <li className='nav-item'>
                                    <a className='nav-link active' href='#'>
                                        <i className="fas fa-columns mx-3"></i>
                                        Dashboard <span className='sr-only'>(current)</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                    <i className="fas fa-users-cog mx-3"></i>
                                    Admins
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                    <i className="fas fa-users mx-3"></i>
                                    Users
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div> */}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        currentAdmin: state.currentAdmin
    }
}

export default connect(mapStateToProps, {logout})(Navbar);