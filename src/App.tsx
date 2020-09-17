import Auth from './auth/Auth'
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Login from "./Components/Forms/Login.component";
import SignUp from "./Components/Forms/SignUp.component";
import ModalForm from './Components/Modals/Modal'
import ModalReconForm from './Components/Modals/ReconModal'
import ReconTable from './Components/Tables/ReconTable'
import TaskTable from './Components/Tables/TaskTable'
import { CSVLink } from "react-csv"
import { any } from 'prop-types';


export interface AppProps {}

export interface AppProps {
  auth: Auth
  tableName: any
  history: any
}

export interface AppState {
  items: any[]
}

export default class App extends Component<AppProps, AppState> {
  tableName: any;
  
  constructor(props: AppProps) {
    super(props)
    this.tableName = props.tableName
  }


  const getItems () {
    fetch('http://localhost:3000/' + this.tableName)
      .then(response => response.json())
      .then(items => this.setState(items))
      .catch(err => console.log(err))
  }

  addItemToState = (item: any) => {
    this.setState({ 
      items: [this.state.items.push(item)] 
    });
  };

  const updateState = (item: { TASK_ID: any; }) => {
    const itemIndex = this.state.items.findIndex((data: { TASK_ID: any; }) => data.TASK_ID === item.TASK_ID)
    const newArray = [...this.state.items.slice(0, itemIndex), item, ...this.state.items.slice(itemIndex + 1)]
    this.setState({ items: newArray });
  }

  const deleteItemFromState = (TASK_ID: any) => {
    const updatedItems = this.state.items.filter((item: { TASK_ID: any; }) => item.TASK_ID !== TASK_ID)
    this.setState({ items: updatedItems });
  }

  const updateReconState = (item: { TASK_ID: any; TASK_VERSION_ID: any; }) => {
    const itemIndex = this.state.items.findIndex((data: { TASK_ID: any; TASK_VERSION_ID: any; }) => 
      (data.TASK_ID === item.TASK_ID) && (data.TASK_VERSION_ID === item.TASK_VERSION_ID))
    const newArray = [...this.state.items.slice(0, itemIndex), item, ...this.state.items.slice(itemIndex + 1)]
    this.setState({ items: newArray });
  }
  
  const deleteReconFromState = (TASK_ID: any, TASK_VERSION_ID: any) => {
    const updatedItems = this.state.items.filter((item: { TASK_ID: any; TASK_VERSION_ID: any; }) => (item.TASK_ID !== TASK_ID)  && (item.TASK_VERSION_ID !== TASK_VERSION_ID))
    this.setState({ items: updatedItems });
  };

  useEffect(() => {
    this.getItems()
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
