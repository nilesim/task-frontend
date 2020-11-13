import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap'
import { CSVLink } from "react-csv"

import { ReconModel } from '../../types/ReconModel'
import { TaskModel } from '../../types/TaskModel'
import ModalForm from '../Modals/Modal'
import ModalReconForm from '../Modals/ReconModal'
import ReconTable from '../Tables/ReconTable'
import TaskTable from '../Tables/TaskTable'
import { History } from 'history'
import { getTaskData } from '../../../../task-api/controllers/taskController'

interface ItemListProps {
    history: History
  }
  
  interface ItemListState {
    items: TaskModel[]
  }
  
  export class Tabs extends React.PureComponent<ItemListProps, ItemListState> {
    state: ItemListState = {
      items: []
    }
 


    render() {
        return (
            <div>
          
            </div>
        );
    }
}