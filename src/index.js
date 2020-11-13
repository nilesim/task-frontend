import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './styles.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode >
    <div className="main"  >
      <h1> - </h1>
      <h1 className="display-3" style={{margin: "20px 0"}}>Radar App</h1>
      <Tabs>
            <TabList>
              <Tab>Tasks</Tab>
              <Tab>Recons</Tab>
              <Tab>Scheduler</Tab>
            </TabList>

            <TabPanel className="bg">
              <h2 className="display-4">Task Definition</h2>
              <App tableName='task' />
            </TabPanel>
            <TabPanel className="bg">
              <h2 className="display-4">Reconciliation Definition</h2>
              <App tableName='recon' />
            </TabPanel>
            <TabPanel className="bg">
              <h2 className="display-4">Try</h2>
              <App tableName='recon' />
            </TabPanel>
          </Tabs>
    </div>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
