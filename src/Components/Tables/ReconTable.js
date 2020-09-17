import React from 'react'
import { Table, Button } from 'reactstrap';
import ReconModalForm from '../Modals/ReconModal'

function ReconTable(props){
  const deleteItem = (TASK_ID, task_version_id) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/recon', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TASK_ID, task_version_id
      })
    })
      .then(response => response.json())
      .then(item => {
        props.deleteItemFromState(TASK_ID, task_version_id)
      })
      .catch(err => console.log(err))
    }
  }
//TASK_ID, TASK_VERSION_ID, SOURCE_1_ID, SOURCE_2_ID, SOURCE_1_SQL, SOURCE_2_SQL, SOURCE_1_REPORTING_NAME, SOURCE_2_REPORTING_NAME, EMAIL_FROM, EMAIL_TO, EMAIL_SUBJECT, EMAIL_INFO, TICKET_TO, TICKET_INFO, RESULTS_NEED_VERIFICATION, SCREEN_INTEGRATION, TICKET_OWNER, TICKET_SUBJECT, SOURCE_1_KEYS, SOURCE_1_VALUES, SOURCE_1_SUPPORT, SOURCE_2_KEYS, SOURCE_2_VALUES, SOURCE_2_SUPPORT, SOURCE_1_FILTER, SOURCE_2_FILTER
  const items = props.items.map(item => {
    return (
      <tr key={item.TASK_ID & item.TASK_VERSION_ID}>
        <td>
          <div style={{width:"110px"}}>
            <ReconModalForm buttonLabel="Edit" item={item} updateReconState={props.updateReconState}/>
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.TASK_ID, item.TASK_VERSION_ID)}>Del</Button>
          </div>
        </td>
        <th scope="row">{item.TASK_ID}</th>
        <td>{item.TASK_VERSION_ID}</td>
        <td>{item.SOURCE_1_REPORTING_NAME}</td>
        <td>{item.SOURCE_2_REPORTING_NAME}</td>
        <td>{item.SOURCE_1_ID}</td>
        <td>{item.SOURCE_2_ID}</td>
        <td>{item.EMAIL_FROM}</td>
        <td>{item.EMAIL_TO}</td>
        <td>{item.EMAIL_SUBJECT}</td>
        <td>{item.EMAIL_INFO}</td>
        <td>{item.TICKET_TO}</td>
        <td>{item.TICKET_INFO}</td>
        <td>{item.RESULTS_NEED_VERIFICATION}</td>
        <td>{item.SCREEN_INTEGRATION}</td>
        <td>{item.TICKET_OWNER}</td>
        <td>{item.TICKET_SUBJECT}</td>
        <td>{item.SOURCE_1_KEYS}</td>
        <td>{item.SOURCE_1_VALUES}</td>
        <td>{item.SOURCE_1_SUPPORT}</td>
        <td>{item.SOURCE_2_KEYS}</td>
        <td>{item.SOURCE_2_VALUES}</td>
        <td>{item.SOURCE_2_SUPPORT}</td>
        <td>{item.SOURCE_1_FILTER}</td>
        <td>{item.SOURCE_2_FILTER}</td>
        <td>{item.SOURCE_1_SQL}</td>
        <td>{item.SOURCE_2_SQL}</td>

      </tr>
      )
    })
// TASK_ID, TASK_VERSION_ID, SOURCE_1_REPORTING_NAME, SOURCE_2_REPORTING_NAME, SOURCE_1_ID, SOURCE_2_ID, SOURCE_1_SQL, SOURCE_2_SQL, EMAIL_FROM, EMAIL_TO, EMAIL_SUBJECT, EMAIL_INFO, TICKET_TO, TICKET_INFO, RESULTS_NEED_VERIFICATION, SCREEN_INTEGRATION, TICKET_OWNER, TICKET_SUBJECT, SOURCE_1_KEYS, SOURCE_1_VALUES, SOURCE_1_SUPPORT, SOURCE_2_KEYS, SOURCE_2_VALUES, SOURCE_2_SUPPORT, SOURCE_1_FILTER, SOURCE_2_FILTER
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>              </th>
          <th>Task ID</th>
          <th>Task Version Id</th>
          <th>Source 1</th>
          <th>Source 2</th>
          <th>SOURCE 1 ID</th>
          <th>SOURCE 2 ID</th>
          <th> EMAIL FROM</th>
          <th> EMAIL TO</th>
          <th> EMAIL SUBJECT</th>
          <th> EMAIL INFO</th>
          <th> TICKET TO</th>
          <th> TICKET INFO</th>
          <th> RESULTS NEED VERIFICATION</th>
          <th> SCREEN INTEGRATION</th>
          <th> TICKET OWNER</th>
          <th> TICKET SUBJECT</th>
          <th> SOURCE 1 KEYS</th>
          <th> SOURCE 1 VALUES</th>
          <th> SOURCE 1 SUPPORT</th>
          <th> SOURCE 2 KEYS</th>
          <th> SOURCE 2 VALUES</th>
          <th> SOURCE 2 SUPPORT</th>
          <th> SOURCE 1 FILTER</th>
          <th> SOURCE 2 FILTER</th>
          <th>SOURCE 1 SQL</th>
          <th>SOURCE 2 SQL</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  )
}

export default ReconTable