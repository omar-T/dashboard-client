import React from 'react'
import Logo from '../images/logo-s.png'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../store/actions/auth'

const Navbar = props => {
    let history = useHistory();
    const logout = e => {
        e.preventDefault();
        props.logout();
        history.push('/');
    }

    const handleCollapse = (e) => {
        document.getElementById('sidebar').classList.toggle('active');
    }
    
    const {currentAdmin} = props;
    return (
        <nav className='navbar navbar-light fixed-top p-0 px-3 top-navbar'>
            <img className='navbar-brand p-0' src={Logo} alt='Dashboard Home'/>
            <ul className='navbar-nav ml-4 mr-auto'>
                <li className='nav-item'>
                    <button className='navbar-toggler' type="button" onClick={handleCollapse} id="sidebarCollapse" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </li>
            </ul>
            <ul className='navbar-nav flex-row'>
                <li className='nav-item mx-3'>
                    <Link to='' className='nav-link'>{`${currentAdmin.admin.name} ${currentAdmin.admin.surname}`}</Link>
                </li>
                <li className='nav-item'>
                    <button onClick={logout} className='logout nav-link'>
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                </li>
            </ul>
        </nav>
    )
}

function mapStateToProps(state){
    return {
        currentAdmin: state.currentAdmin
    }
}

export default connect(mapStateToProps, {logout})(Navbar);