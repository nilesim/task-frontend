import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    TASK_ID: 0,
    task_version_id: '',
    source_1_reporting_name: '',
    source_2_reporting_name: '',
    source_1_id: '',
    source_2_id: '',
    source_1_sql: '',
    source_2_sql: '',
    email_from: '',
    email_to: '',
    email_subject: '',
    email_info: '',
    ticket_to: '',
    ticket_info: '',
    results_need_verification: '',
    screen_integration: '',
    ticket_owner: '',
    ticket_subject: '',
    source_1_keys: '',
    source_1_values: '',
    source_1_support: '',
    source_2_keys: '',
    source_2_values: '',
    source_2_support: '',
    source_1_filter: '',
    source_2_filter: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/recon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TASK_ID: form.TASK_ID,
        task_version_id: form.task_version_id ,
        source_1_reporting_name:  form.source_1_reporting_name,
        source_2_reporting_name: form.source_2_reporting_name,
        source_1_id: form.source_1_id,
        source_2_id: form.source_2_id ,
        source_1_sql: form.source_1_sql ,
        source_2_sql: form.source_2_sql ,
        email_from: form.email_from ,
        email_to: form.email_to ,
        email_subject: form.email_subject ,
        email_info: form.email_info ,
        ticket_to: form.ticket_to ,
        ticket_info: form.ticket_info ,
        results_need_verification: form.results_need_verification ,
        screen_integration: form.screen_integration ,
        ticket_owner: form.ticket_owner ,
        ticket_subject: form.ticket_subject ,
        source_1_keys: form.source_1_keys ,
        source_1_values: form.source_1_values ,
        source_1_support: form.source_1_support ,
        source_2_keys: form.source_2_keys ,
        source_2_values: form.source_2_values ,
        source_2_support: form.source_2_support ,
        source_1_filter: form.source_1_filter ,
        source_2_filter: form.source_2_filter 
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/recon', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TASK_ID: form.TASK_ID,
        TASK_VERSION_ID: form.task_version_id ,
        SOURCE_1_REPORTING_NAME:  form.source_1_reporting_name,
        SOURCE_2_REPORTING_NAME: form.source_2_reporting_name,
        SOURCE_1_ID: form.source_1_id,
        SOURCE_2_ID: form.source_2_id ,
        SOURCE_1_SQL: form.source_1_sql ,
        SOURCE_2_SQL: form.source_2_sql ,
        EMAIL_FROM: form.email_from ,
        EMAIL_TO: form.email_to ,
        EMAIL_SUBJECT: form.email_subject ,
        EMAIL_INFO: form.email_info ,
        TICKET_TO: form.ticket_to ,
        TICKET_INFO: form.ticket_info ,
        RESULTS_NEED_VERIFICATION: form.results_need_verification ,
        SCREEN_INTEGRATION: form.screen_integration ,
        TICKET_OWNER: form.ticket_owner ,
        TICKET_SUBJECT: form.ticket_subject ,
        SOURCE_1_KEYS: form.source_1_keys ,
        SOURCE_1_VALUES: form.source_1_values ,
        SOURCE_1_SUPPORT: form.source_1_support ,
        SOURCE_2_KEYS: form.source_2_keys ,
        SOURCE_2_VALUES: form.source_2_values ,
        SOURCE_2_SUPPORT: form.source_2_support ,
        SOURCE_1_FILTER: form.source_1_filter ,
        SOURCE_2_FILTER: form.source_2_filter 
      })
    })
      .then(response => response.json())
      .then(item => {
        props.updateReconState(item)
        props.toggle()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(props.item){
      const { TASK_ID, TASK_VERSION_ID, SOURCE_1_ID, SOURCE_2_ID, SOURCE_1_SQL, SOURCE_2_SQL, SOURCE_1_REPORTING_NAME, SOURCE_2_REPORTING_NAME, EMAIL_FROM, EMAIL_TO, EMAIL_SUBJECT, EMAIL_INFO, TICKET_TO, TICKET_INFO, RESULTS_NEED_VERIFICATION, SCREEN_INTEGRATION, TICKET_OWNER, TICKET_SUBJECT, SOURCE_1_KEYS, SOURCE_1_VALUES, SOURCE_1_SUPPORT, SOURCE_2_KEYS, SOURCE_2_VALUES, SOURCE_2_SUPPORT, SOURCE_1_FILTER, SOURCE_2_FILTER } = props.item
      setValues({ TASK_ID, TASK_VERSION_ID, SOURCE_1_ID, SOURCE_2_ID, SOURCE_1_SQL, SOURCE_2_SQL, SOURCE_1_REPORTING_NAME, SOURCE_2_REPORTING_NAME, EMAIL_FROM, EMAIL_TO, EMAIL_SUBJECT, EMAIL_INFO, TICKET_TO, TICKET_INFO, RESULTS_NEED_VERIFICATION, SCREEN_INTEGRATION, TICKET_OWNER, TICKET_SUBJECT, SOURCE_1_KEYS, SOURCE_1_VALUES, SOURCE_1_SUPPORT, SOURCE_2_KEYS, SOURCE_2_VALUES, SOURCE_2_SUPPORT, SOURCE_1_FILTER, SOURCE_2_FILTER })
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
  <FormGroup>
	<Label for="TASK_ID">ID</Label>
	<Input type="text" name="TASK_ID" id="TASK_ID" onChange={onChange} value={form.TASK_ID === null ? '' : form.TASK_ID} />
  </FormGroup>
  <FormGroup>
	<Label for="TASK_VERSION_ID">Version ID</Label>
	<Input type="text" name="TASK_VERSION_ID" id="TASK_VERSION_ID" onChange={onChange} value={form.TASK_VERSION_ID === null ? '' : form.TASK_VERSION_ID}  />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_1_REPORTING_NAME">SOURCE_1_REPORTING_NAME</Label>
	<Input type="text" name="SOURCE_1_REPORTING_NAME" id="SOURCE_1_REPORTING_NAME" onChange={onChange} value={form.SOURCE_1_REPORTING_NAME === null ? '' : form.SOURCE_1_REPORTING_NAME} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_1_ID">Source 1 ID</Label>
	<Input type="textArea" name="SOURCE_1_ID" id="SOURCE_1_ID" onChange={onChange} value={form.SOURCE_1_ID === null ? '' : form.SOURCE_1_ID} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_1_KEYS">Source 1 Keys</Label>
	<Input type="textArea" name="SOURCE_1_KEYS" id="SOURCE_1_KEYS" onChange={onChange} value={form.SOURCE_1_KEYS === null ? '' : form.SOURCE_1_KEYS} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_1_VALUES">Source 1 Values</Label>
	<Input type="textArea" name="SOURCE_1_VALUES" id="SOURCE_1_VALUES" onChange={onChange} value={form.SOURCE_1_VALUES === null ? '' : form.SOURCE_1_VALUES} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_1_SUPPORT">Source 1 Support</Label>
	<Input type="textArea" name="SOURCE_1_SUPPORT" id="SOURCE_1_SUPPORT" onChange={onChange} value={form.SOURCE_1_SUPPORT === null ? '' : form.SOURCE_1_SUPPORT} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_1_FILTER">Source 1 Filter</Label>
	<Input type="textArea" name="SOURCE_1_FILTER" id="SOURCE_1_FILTER" onChange={onChange} value={form.SOURCE_1_FILTER === null ? '' : form.SOURCE_1_FILTER} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_1_SQL">Source 1 SQL</Label>
	<Input type="textArea" name="SOURCE_1_SQL" id="SOURCE_1_SQL" onChange={onChange} value={form.SOURCE_1_SQL === null ? '' : form.SOURCE_1_SQL}  placeholder="SELECT * FROM SCHEMA.VIEW" />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_2_REPORTING_NAME">Source 2 Reporting Name</Label>
	<Input type="text" name="SOURCE_2_REPORTING_NAME" id="SOURCE_2_REPORTING_NAME" onChange={onChange} value={form.SOURCE_2_REPORTING_NAME === null ? '' : form.SOURCE_2_REPORTING_NAME} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_2_ID">Source 2 ID</Label>
	<Input type="text" name="SOURCE_2_ID" id="SOURCE_2_ID" onChange={onChange} value={form.SOURCE_2_ID === null ? '' : form.SOURCE_2_ID} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_2_KEYS">SOURCE 2 Keys</Label>
	<Input type="textArea" name="SOURCE_2_KEYS" id="SOURCE_2_KEYS" onChange={onChange} value={form.SOURCE_2_KEYS === null ? '' : form.SOURCE_2_KEYS} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_2_VALUES">SOURCE 2 Values</Label>
	<Input type="textArea" name="SOURCE_2_VALUES" id="SOURCE_2_VALUES" onChange={onChange} value={form.SOURCE_2_VALUES === null ? '' : form.SOURCE_2_VALUES} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_2_SUPPORT">SOURCE 2 Support</Label>
	<Input type="textArea" name="SOURCE_2_SUPPORT" id="SOURCE_2_SUPPORT" onChange={onChange} value={form.SOURCE_2_SUPPORT === null ? '' : form.SOURCE_2_SUPPORT} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_2_FILTER">SOURCE 2 Filter</Label>
	<Input type="textArea" name="SOURCE_2_FILTER" id="SOURCE_2_FILTER" onChange={onChange} value={form.SOURCE_2_FILTER === null ? '' : form.SOURCE_2_FILTER} />
  </FormGroup>
  <FormGroup>
	<Label for="SOURCE_2_SQL">Source 2 SQL</Label>
	<Input type="textArea" name="SOURCE_2_SQL" id="SOURCE_2_SQL" onChange={onChange} value={form.SOURCE_2_SQL === null ? '' : form.SOURCE_2_SQL}  placeholder="SELECT * FROM SCHEMA.VIEW" />
  </FormGroup>
  <FormGroup>
	<Label for="EMAIL_FROM">EMAIL_FROM</Label>
	<Input type="textArea" name="EMAIL_FROM" id="EMAIL_FROM" onChange={onChange} value={form.EMAIL_FROM === null ? '' : form.EMAIL_FROM} />
  </FormGroup>
  <FormGroup>
	<Label for="EMAIL_TO">EMAIL_TO</Label>
	<Input type="textArea" name="EMAIL_TO" id="EMAIL_TO" onChange={onChange} value={form.EMAIL_TO === null ? '' : form.EMAIL_TO} />
  </FormGroup>
    <FormGroup>
	<Label for="EMAIL_SUBJECT">EMAIL_SUBJECT</Label>
	<Input type="textArea" name="EMAIL_SUBJECT" id="EMAIL_SUBJECT" onChange={onChange} value={form.EMAIL_SUBJECT === null ? '' : form.EMAIL_SUBJECT} />
  </FormGroup>
    <FormGroup>
	<Label for="EMAIL_INFO">EMAIL_INFO</Label>
	<Input type="textArea" name="EMAIL_INFO" id="EMAIL_INFO" onChange={onChange} value={form.EMAIL_INFO === null ? '' : form.EMAIL_INFO} />
  </FormGroup>
  <FormGroup>
	<Label for="RESULTS_NEED_VERIFICATION">RESULTS_NEED_VERIFICATION</Label>
	<Input type="textArea" name="RESULTS_NEED_VERIFICATION" id="RESULTS_NEED_VERIFICATION" onChange={onChange} value={form.RESULTS_NEED_VERIFICATION === null ? '' : form.RESULTS_NEED_VERIFICATION} />
  </FormGroup>
    <FormGroup>
	<Label for="SCREEN_INTEGRATION">SCREEN_INTEGRATION</Label>
	<Input type="textArea" name="SCREEN_INTEGRATION" id="SCREEN_INTEGRATION" onChange={onChange} value={form.SCREEN_INTEGRATION === null ? '' : form.SCREEN_INTEGRATION} />
  </FormGroup>
  <FormGroup>
	<Label for="TICKET_TO">TICKET_TO</Label>
	<Input type="textArea" name="TICKET_TO" id="TICKET_TO" onChange={onChange} value={form.TICKET_TO === null ? '' : form.TICKET_TO} />
  </FormGroup>
  <FormGroup>
	<Label for="TICKET_INFO">TICKET_INFO</Label>
	<Input type="textArea" name="TICKET_INFO" id="TICKET_INFO" onChange={onChange} value={form.TICKET_INFO === null ? '' : form.TICKET_INFO} />
  </FormGroup>
  <FormGroup>
	<Label for="TICKET_OWNER">TICKET_OWNER</Label>
	<Input type="textArea" name="TICKET_OWNER" id="TICKET_OWNER" onChange={onChange} value={form.TICKET_OWNER === null ? '' : form.TICKET_OWNER} />
  </FormGroup>
  <FormGroup>
	<Label for="TICKET_SUBJECT">TICKET_SUBJECT</Label>
	<Input type="textArea" name="TICKET_SUBJECT" id="TICKET_SUBJECT" onChange={onChange} value={form.TICKET_SUBJECT === null ? '' : form.TICKET_SUBJECT} />
  </FormGroup>

      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm