import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import SendIcon from "@material-ui/icons/Send";
import {
  DataGrid,
  ColDef,
  ValueGetterParams,
  CellParams,
  GridApi,
  SelectionChangeParams
} from "@material-ui/data-grid";
import "../../styles.css";
import { TableNames, TableActions } from "./tableSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from "@material-ui/core";
import GenericForm from "../Forms/GenericForm";

type TableGridProps = {
  tableName: TableNames;
  editFormOpen?: boolean;
};

type RowUpdateParam = { fromRow: number; toRow: number; updated: boolean; };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    }
  })
);

const TableGrid: React.FC<TableGridProps> = props => {
  const state = useSelector((rootState: RootState) => rootState.tables[props.tableName]);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (!state.data && !state.isLoading) {
      TableActions.fetchTableDataAsync(dispatch, props.tableName);
    }


  }, [dispatch, state]);



  if (!state) {
    return <b>Lüftfen bekkleyiniz</b>;
  }

  const tableData = state.data;

  if (!tableData || state.isLoading === true) {
    return <b>Lütfen bekleyiniz</b>;
  }

  const getColumns = () => {
    return [
      {
        field: "",
        headerName: "",
        sortable: false,
        width: 100,
        disableClickEventBubbling: true,
        renderCell: (params: CellParams) => {
          const onEdit = () => {
            const api: GridApi = params.api;
            dispatch(TableActions.setSelectedRow({ tableName: props.tableName, data: params.data }));
          };

          return <IconButton onClick={onEdit} aria-label="edit"><EditIcon>Click</EditIcon></IconButton>;
        }
      }, ...tableData.columns];
  }
  
  const newItem = () => {
    dispatch(TableActions.setSelectedRow({ tableName: props.tableName, data: {
      "TASK_ID": "",
      "TASK_NAME": "",
      "TASK_TYPE": "",
      "id": "-1"
    } }));  
  };

  const deleteItem = () => {
    if (!state.rowsToDelete) {
      if (!window.confirm('No item selected!')) {
        return;
      }
    } else {
      if (!window.confirm('Delete item forever?')) {
        return;
      }
      TableActions.submitTableDeleteAsync(dispatch, props.tableName, state.rowsToDelete );
    }    
  };

  const onCheckboxChange = (param: SelectionChangeParams) => {
    dispatch(TableActions.setRowsToDelete({tableName: props.tableName, data: param.rowIds}));
  };

  console.log("tabledata", tableData);

  return (

    <React.Fragment>
      <div hidden={!state.onEdit}>
        <GenericForm tableName={props.tableName} />
      </div>
      <div className='radartable' hidden={state.onEdit} style={{ height: 600, width: '100%' }}>
        <DataGrid rows={tableData.rows} columns={getColumns()} pageSize={9} checkboxSelection onSelectionChange={onCheckboxChange} />
      </div>
      <div hidden={state.onEdit}>
        <Button variant="contained" color="secondary" className={classes.button} onClick={deleteItem} startIcon={<DeleteIcon />}>
          Delete
        </Button>
        {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
        <Button variant="contained" color="primary" className={classes.button} onClick={newItem} endIcon={<SendIcon />} >
          New
        </Button>
      </div>
    </React.Fragment>
  );
}

export default TableGrid;