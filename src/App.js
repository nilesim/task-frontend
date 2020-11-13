import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Auth from './auth/Auth'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Login from "./Components/Forms/Login.component";
import SignUp from "./Components/Forms/SignUp.component";
import Tabs from "./Components/Forms/Tabs.component"


function App(props) {

  const tableName = props.tableName
  const [items, setItems] = useState([])

  const getItems= () => {
    fetch('http://localhost:3000/' + tableName)
      .then(response => response.json())
      .then(items => setItems(items))
      .catch(err => console.log(err))
  }


  const addItemToState = (item) => {
    setItems([...items, item])
  }

  const updateState = (item) => {
    const itemIndex = items.findIndex(data => data.TASK_ID === item.TASK_ID)
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }

  const deleteItemFromState = (TASK_ID) => {
    const updatedItems = items.filter(item => item.TASK_ID !== TASK_ID)
    setItems(updatedItems)
  }

  const updateReconState = (item) => {
    const itemIndex = items.findIndex(data => 
      (data.TASK_ID === item.TASK_ID) && (data.TASK_VERSION_ID === item.TASK_VERSION_ID))
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
    setItems(newArray)
  }
  
  const deleteReconFromState = (TASK_ID, TASK_VERSION_ID) => {
    const updatedItems = items.filter(item => (item.TASK_ID !== TASK_ID)  && (item.TASK_VERSION_ID !== TASK_VERSION_ID))
    setItems(updatedItems)
  }

  const getAuthenticated = () => {
    await authenticate({
    ldapOpts: { url: 'ldap://ldapenterprisetest.turkcell.tgc:389' },
    userDn: 'uid=radar, ou=SpecialUsers,dc=entp,dc=tgc',
    userPassword: 'Test1234',
    userSearchBase: 'dc=entp,dc=tgc',
    usernameAttribute: 'uid',
    username: 'radar',
  })
}

  useEffect(() => {
    getAuthenticated()
  }, []);

  
  return (
    <Container className="App">
      <Router>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Turkcell</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              
              <li className="nav-item">
                <Link className="nav-link" to={"/home"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/home" component={Tabs} />
          </Switch>
        </div>
      </div>
      </Router>
      
    </Container>
)


}

export default App