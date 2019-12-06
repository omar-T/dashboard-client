import React, { Component } from 'react'
import Logo from '../images/logo-s.png'
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
                <div>
                    <div className='container-fluid'>
                        <nav className='navbar navbar-dark bg-dark'>
                            <img className='navbar-brand' src={Logo} alt='Dashboard Home'/>
                            <ul className='navbar-nav mr-auto'>
                                <li className='nav-item'>
                                    <button className='navbar-toggler' type="button" onClick={{/*this.handleCollapse*/}} id="sidebarCollapse" >
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                </li>
                            </ul>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    <button onClick={this.logout} className='logout'>
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {/* <nav id='sidebar'>
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
                    </nav> */}
                    
                    
                </div>
            }
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