import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

function TaskTable(props){
  const deleteItem = TASK_ID => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/task', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TASK_ID
      })
    })
      .then(response => response.json())
      .then(item => {
        props.deleteItemFromState(TASK_ID)
      })
      .catch(err => console.log(err))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.TASK_ID}>
        <th scope="row">{item.TASK_ID}</th>
        <td>{item.TASK_NAME}</td>
        <td>{item.TASK_TYPE}</td>
        <td>
          <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState}/>
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.TASK_ID)}>Del</Button>
          </div>
        </td>
      </tr>
      )
    })

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task Name</th>
          <th>Task Type</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default TaskTable