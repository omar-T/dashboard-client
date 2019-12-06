import React from 'react'
import {Provider} from 'react-redux'
import {configureStore} from '../store'
import {BrowserRouter as Router} from 'react-router-dom'
import {setAuthorizationToken, loginAdmin} from '../store/actions/auth'
import jwtDecode from 'jwt-decode'
import Main from './Main'
import Navbar from './Navbar'

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually eampering with the key of jwtToken in localStorage
  try{
    store.dispatch(loginAdmin(jwtDecode(localStorage.jwtToken)));
  }catch(err){
    store.dispatch(loginAdmin({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
        <Navbar/>
        <div className='wrapper'>
          <Main/>
        </div>
    </Router>
  </Provider>
);

export default App;