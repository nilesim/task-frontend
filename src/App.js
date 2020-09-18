import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Login from "./Components/Forms/Login.component";
import SignUp from "./Components/Forms/SignUp.component";
import ModalForm from './Components/Modals/Modal'
import ModalReconForm from './Components/Modals/ReconModal'
import ReconTable from './Components/Tables/ReconTable'
import TaskTable from './Components/Tables/TaskTable'
import { CSVLink } from "react-csv"

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

  useEffect(() => {
    getItems()
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
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
      </Router>

      
      <br></br>
      <Row>
        <Col hidden={(tableName!=='task')}>
          <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{float: "left", marginRight: "10px"}}
            className="btn btn-primary"
            data={items}>
            Download CSV
          </CSVLink>
          <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
        </Col>
        <Col hidden={(tableName!=='recon')}>
          <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{float: "left", marginRight: "10px"}}
            className="btn btn-primary"
            data={items}>
            Download CSV
          </CSVLink>
          <ModalReconForm buttonLabel="Add Item" addItemToState={addItemToState} />
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col hidden={(tableName!=='task')}>
          <TaskTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
        </Col>
        <Col hidden={(tableName!=='recon')}>
          <ReconTable items={items} updateReconState={updateReconState} deleteItemFromState={deleteReconFromState} />
        </Col>
      </Row>
    </Container>
)


}

export default App