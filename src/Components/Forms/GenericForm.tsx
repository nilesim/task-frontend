import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TableNames } from '../Tables/tableSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(5),
        width: '25ch',
      },
    },
  }),
);

type GenericFormProps = {
  tableName: TableNames;
};

const GenericForm: React.FC<GenericFormProps> = props => {
  const classes = useStyles();
  const state = useSelector((rootState: RootState) => rootState.tables[props.tableName].rowToEdit);
  if (!state) {
    return <b>No row selected</b>;
  }
  const columns = Object.keys(state);
  debugger;
  return (
    <React.Fragment>
      <form className={classes.root} >
        {
          columns.map(col => {
            if(col==="id")
              return;
            return (
              <FormControl variant="outlined">
              <InputLabel htmlFor="component-outlined">{col}</InputLabel>
              <OutlinedInput id="component-outlined" value={state[col]} 
              // onChange={handleChange} 
              label="Name" />
              <FormHelperText id="component-helper-text">
                {col}
              </FormHelperText>
            </FormControl>
            )
          })
        }
        <Button variant="contained" color="primary" className={classes.button} endIcon={<SendIcon />} >
          Submit
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} endIcon={<SendIcon />} >
          Cancel
        </Button>
      </form>
    </React.Fragment>
  )
/*
  return (
    <React.Fragment>
    <form noValidate autoComplete="off">
      <FormControl disabled>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <Input id="component-outlined" value={name} 
        // onChange={handleChange} 
        />
        <FormHelperText id="component-helper-text">Disabled</FormHelperText>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} 
        // onChange={handleChange} 
        label="Name" />
        <FormHelperText id="component-helper-text">
          Some important helper text
        </FormHelperText>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} 
        // onChange={handleChange} 
        label="Name" />
        <FormHelperText id="component-helper-text">
          Some important helper text
        </FormHelperText>
      </FormControl>
    </form>
    </React.Fragment>
  )*/

  //call redux dispatch for row
  /*
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
  }, false)*/


}

export default GenericForm;