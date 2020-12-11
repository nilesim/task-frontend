import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Forms/Login.component";
//import SignUp from "./Components/Forms/SignUp.component";
import Tabs from "./Components/Forms/Tabs.component"
//import Auth from './auth/Auth';
import Button from '@material-ui/core/Button';


import 'fontsource-roboto';
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from './app/store';
import { useHistory } from 'react-router';
import { AuthActions } from './auth/authSlice';
import Constants from './app/Constants';
import ProtectedRoute from './Components/Routes/ProtectedRoute';
const Routes = Constants.Routes;

function App() {

  const auth = useSelector((root : RootState) => root.auth);
  const user = auth.user;
  const isLoggedIn = user.displayName;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {

    if (isLoggedIn) {
      history.push(Routes.home.path);
    }

  }, [isLoggedIn, history]);

  const logout = () => {
    dispatch(AuthActions.logout());
    history.push(Routes.signOut.path);
  };


  const guestUserLinks = (
      <React.Fragment>
        <li className="nav-item">
            <Link className="nav-link" to={Routes.signIn.path}>{Routes.signIn.text}</Link>
        </li>
      </React.Fragment>
  );

  const userLinks = (
    <React.Fragment>
       <li className="nav-item">
            <Link className="nav-link" to={Routes.home.path}>Hi {user.displayName}</Link>
        </li>
        <li className="nav-item">
            <a className="nav-link" onClick={logout} >{Routes.signOut.text}</a>
        </li>
    </React.Fragment>
  );

  const activeLinks = isLoggedIn ? userLinks: guestUserLinks;
  
  return (
    <Container className="App">
      
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={Routes.signIn.path}>Turkcell Radar</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
             {activeLinks}
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">

        <div className="auth-inner">
          <Switch>
            <Route path={Routes.signIn.path} >
              <Login/>
              </Route>
            <Route path={Routes.signOut.path}>
              
            </Route>
            <ProtectedRoute path={Routes.home.path}>
            <Tabs/>
            </ProtectedRoute>
           
          </Switch>
        </div>
      </div>
      
      
    </Container>
)


}

export default App;