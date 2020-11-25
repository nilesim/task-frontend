import React from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

type TaskTableProps = {
  deleteItemFromState: (task_id: string) => void;
  items: Task[];
  updateState: () => void;
};

type Task = {
  TASK_ID: string;
  TASK_NAME: string;
  TASK_TYPE: string;
};

const TaskTable: React.FC<TaskTableProps> = props => {

  const deleteItem = async (task_id: string) => {
    
    if (!window.confirm('Delete item forever?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/task', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          task_id
        })
      });
     // const deletedTask: Task = await response.json();
      props.deleteItemFromState(task_id);
    }
    catch (err) {
      console.error(err);
    }

  };

  const items = props.items.map(item => {
    return (
      <tr key={item.TASK_ID}>
        <th scope="row">{item.TASK_ID}</th>
        <td>{item.TASK_NAME}</td>
        <td>{item.TASK_TYPE}</td>
        <td>
          <div style={{ width: "110px" }}>
            <ModalForm buttonLabel="Edit" item={item} updateState={props.updateState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.TASK_ID)}>Del</Button>
          </div>
        </td>
      </tr>
    )
  });

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