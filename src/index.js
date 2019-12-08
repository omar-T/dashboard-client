import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import {Provider} from 'react-redux'
import {configureStore} from './store'
import {setAuthorizationToken, loginAdmin} from './store/actions/auth'
import jwtDecode from 'jwt-decode'
import * as serviceWorker from './serviceWorker';

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

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
