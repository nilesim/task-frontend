import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { TableNames, TableActions } from "../Tables/tableSlice";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    root: {
      '& .MuiFormControl-root': {
        margin: theme.spacing(1),
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
  const dispatch = useDispatch();
  const state = useSelector((rootState: RootState) => rootState.tables[props.tableName]);
  const rowState = useSelector((rootState: RootState) => rootState.tables[props.tableName].rowToEdit);
  if (!rowState) {
    return <b>No row selected</b>;
  }
  const columns = Object.keys(rowState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(TableActions.changeSelectedRow(
      {
        tableName: props.tableName,
        key: event.target.id, 
        value: event.target.value
      }));
    console.log(event.target.value, rowState);
  };

  const handleCancel = () => {
    dispatch(TableActions.cancelEdit(props.tableName));
    console.log(rowState);
    return;
  };

  const handleSubmit = () => {
    TableActions.submitTableEditAsync(dispatch, props.tableName, rowState );
    console.log(rowState);
    return;
  };

  return (
    <React.Fragment>
      <form className={classes.root} >
        {
          columns.map(col => {
            if (col === "id")
              return;
            return (
              <FormControl variant="outlined" key={col} >
                <InputLabel htmlFor="component-outlined">{col}</InputLabel>
                <OutlinedInput id={col} value={rowState[col]}
                  onChange={handleChange}
                  accessKey={col}
                  key={col}
                  label="{col}" />
                <FormHelperText id="component-helper-text">
                  {col}
                </FormHelperText>
              </FormControl>
            )
          })
        }
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit} endIcon={<SendIcon />} >
          Submit
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={handleCancel} endIcon={<SendIcon />} >
          Cancel
        </Button>
      </form>
    </React.Fragment>
  )


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