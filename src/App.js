import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductFeed from './ProductFeed';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Checkout from './Checkout';
import Signup from './Signup';
import Login from './Login';

const isUserLoggedIn = sessionStorage.getItem('user-session-token');

const AuthRoute = (props) => {
  const { path, component, exact = false, ...p } = props;

  return <Route
            {...p}
            exact={exact}
            path={path}
            render={() => {
              return isUserLoggedIn ? component : window.location.href = '/login'
            }}
          />
}

const PublicRoutes = (props) => {
  const { path, component, exact = false, ...p } = props;

  return <Route
            {...p}
            exact={exact}
            path={path}
            render={() => {
              return isUserLoggedIn ? window.location.href = '/' : component;
            }}
          />
}

const PublicRoute = (props) => {
  return isUserLoggedIn ?
         window.location.href = '/' :
        <Route {...props}>{props.children}</Route>
}


function App() {
  return (
    <div className="App">
      <h1>Shopping App</h1>
      <ProductFeed />
      Hello
      {
        isUserLoggedIn ? (
          <button
            className='btn btn-danger'
            onClick={() => {
              sessionStorage.clear();
              window.location.href = '/login'
            }}
          >Logout</button>
        ) : null
      }


      <Router>
        <Switch>

          <AuthRoute path="/" component={<ProductFeed />} exact  />
          <AuthRoute path="/checkout" component={<Checkout />} />

          <PublicRoutes path="/signup" component={<Signup />} />
          <PublicRoutes path="/login" component={<Login/>} />
        </Switch>
      </Router>

    </div>
  );
}