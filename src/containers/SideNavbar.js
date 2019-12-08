import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './SideNavbar.css'

export default class SideNavbar extends Component {
    render() {
        return (
            <nav className='navbar-dark sidebar' id='sidebar'>
                <div className='sidebar-sticky'>
                    <ul className='navbar-nav'>
                        <li className='nav-item py-2'>
                            <Link className='nav-link active ml-3'>
                                <i className="fas fa-home mr-2"></i> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className='nav-item py-2'>
                            <Link className='nav-link ml-3'>
                                <i className="fas fa-users-cog mr-2"></i> <span>Admins</span>
                            </Link>
                        </li>
                        <li className='nav-item py-2'>
                            <Link className='nav-link ml-3'>
                                <i className="fas fa-users mr-2"></i> <span>Users</span>
                            </Link>
                        </li>
                        <li className='nav-item py-2'>
                            <Link className='nav-link ml-3'>
                                <i className="far fa-file-alt fa-lg mr-2"></i> <span>Docs</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
