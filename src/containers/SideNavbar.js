import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './SideNavbar.css'

class SideNavbar extends Component {
    render() {
        const {currentAdmin} = this.props;
        return (
            <nav className='navbar-dark sidebar' id='sidebar'>
                <div className='sidebar-sticky'>
                    <div className='navbar-brand w-100 text-center border-bottom border-dark'>
                        Welcome {currentAdmin.admin.name}
                    </div>
                    <ul className='navbar-nav'>
                        <li className='nav-item py-2'>
                            <Link to='/' className='nav-link ml-3'>
                                <i className="fas fa-home mr-2"></i> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className='nav-item py-2'>
                            <Link to='/admins' className='nav-link ml-3'>
                                <i className="fas fa-users-cog mr-2"></i> <span>Admins</span>
                            </Link>
                        </li>
                        <li className='nav-item py-2'>
                            <Link to='/users' className='nav-link ml-3'>
                                <i className="fas fa-users mr-2"></i> <span>Users</span>
                            </Link>
                        </li>
                        <li className='nav-item py-2'>
                            <Link to='/docs' className='nav-link ml-3'>
                                <i className="far fa-file-alt fa-lg mr-2"></i> <span>Docs</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default SideNavbar;