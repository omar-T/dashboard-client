import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import Main from './Main'
import Navbar from './Navbar'
import SideNavbar from '../components/SideNavbar'
import Homepage from './Homepage'

const App = (props) => {
  const {currentAdmin} = props;
  if(!currentAdmin.isAuthenticated){
    return (
      <Router>
        <Main/>
      </Router>
    );
  }
  return (
    <Router>
      <Navbar/>
      <div className='container-fluid'>
        <div className='row flex-nowrap'>
          <SideNavbar currentAdmin={currentAdmin}/>
          <Homepage/>
        </div>
      </div>
    </Router>
  );
}

function mapStateToProps(state){
  return {
    currentAdmin: state.currentAdmin
  }
}

export default connect(mapStateToProps)(App);