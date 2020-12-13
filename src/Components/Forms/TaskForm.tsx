import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
/*
function TaskForm(props) {
  const[form, setValues] = useState({
    TASK_ID: 0,
    TASK_NAME: '',
    TASK_TYPE: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/task', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TASK_NAME: form.TASK_NAME,
        TASK_TYPE: form.TASK_TYPE
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log(item)
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/task', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TASK_ID: form.TASK_ID,
        TASK_NAME: form.TASK_NAME,
        TASK_TYPE: form.TASK_TYPE
      })
    })
      .then(response => response.json())
      .then(item => {
          props.updateState(item)
          props.toggle()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(props.item){
      const { TASK_ID, TASK_NAME, TASK_TYPE } = props.item
      setValues({ TASK_ID, TASK_NAME, TASK_TYPE })
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="TASK_NAME">Task Name</Label>
        <Input type="text" name="TASK_NAME" id="TASK_NAME" onChange={onChange} value={form.TASK_NAME === null ? '' : form.TASK_NAME} />
      </FormGroup>
      <FormGroup>
        <Label for="TASK_TYPE">Task Type</Label>
        <Input type="text" name="TASK_TYPE" id="TASK_TYPE" onChange={onChange} value={form.TASK_TYPE === null ? '' : form.TASK_TYPE}  />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default TaskForm*/