import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './SideNavbar.css'

export default class SideNavbar extends Component {
    render() {
        return (
            <nav className='col-md-2 d-none d-md-block navbar-light bg-light sidebar'>
                <div className='sidebar-sticky'>
                    <ul className='navbar-nav '>
                        <li className='nav-item ml-4'>
                            <Link className='nav-link active'>
                                <i className="fas fa-home"></i> Dashboard
                            </Link>
                        </li>
                        <li className='nav-item ml-4'>
                            <Link className='nav-link'>
                                <i class="fas fa-users-cog"></i> Admins
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
