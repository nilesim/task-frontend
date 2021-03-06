import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import TableGrid from "../Tables/TableGrid";

const HeaderTabs: React.FunctionComponent = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const state = useSelector((rootState: RootState) => rootState.counter);
  const test = false;

  useEffect(() => {
    setTimeout(() => {
      //defectedDNSActions.fetchTableColumnsAsync(dispatch);
      //defectedDNSActions.fetchTableRowsAsync(dispatch);
    }, 2000);


  }, [dispatch]);


  return (
    <React.Fragment>
    <div className="main"  >
      <Tabs>
            <TabList>
              <Tab>Tasks</Tab>
              <Tab>Recons</Tab>
              <Tab>Scheduler</Tab>
            </TabList>
            <TabPanel className="bg">
              <h4 className="display-5">Task Definition</h4>
              <TableGrid tableName='task' />
            </TabPanel>
            <TabPanel className="bg">
              <h4 className="display-5">Reconciliation Definition</h4>
              <TableGrid tableName='recon' />
            </TabPanel>
            <TabPanel className="bg">
              <h4 className="display-5">Scheduler</h4>
              <TableGrid tableName='scheduler' />
            </TabPanel>
          </Tabs>
    </div>
    </React.Fragment>
  );
};


export default HeaderTabs;