import React, { useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import "../../styles.css";
import { TableNames, TableActions, TableRowUpdateParam } from "./tableSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { number, bool } from "prop-types";

type DataGridProps = {
  tableName: TableNames;
};

type RowUpdateParam = { fromRow: number; toRow: number; updated: boolean; };

const DataGrid: React.FC<DataGridProps> = props => {
  const state = useSelector((rootState: RootState) => rootState.tables[props.tableName]);
  const dispatch = useDispatch();

  useEffect(() => {

    if (!state || !state.data || !state.data.rows.length) {
      TableActions.fetchTableDataAsync(dispatch, props.tableName);
    }

  }, [dispatch, state]);

  // const getCellActions = (column: any, row: any) => {
  //   const cellActions = [
  //     {
  //       icon: <span className="glyphicon glyphicon-remove" />,
  //       callback: () => {
  //         const rows = [...this.state.rows];
  //         rows.splice(row.index, 1); //
  //         this.setState({ rows: rows });
  //       }
  //     }
  //   ];
  //   return column.key === "action" ? cellActions : null;
  // };



  const onGridRowsUpdated = (arg: TableRowUpdateParam & any) => {
    const val: TableRowUpdateParam = {...arg, tableName: props.tableName};
    dispatch(TableActions.updateSelectedRows(val));
  
  };

  if (!state) {
    return <b>Lüftfen bekkleyiniz</b>;
  }

  const tableData = state.data;

  if (!tableData || state.isLoading === true) {
    return <b>Lütfen bekleyiniz</b>;
  }

  const getRow = (index: number) => {
    return tableData.rows[index];
  }

  console.log("tabledata", tableData);
  return (
    <ReactDataGrid
      columns={tableData.columns}
      rowGetter={getRow}
      rowsCount={tableData.rows.length}
      onGridRowsUpdated={onGridRowsUpdated}
      enableCellSelect={true}
     //getCellActions={getCellActions}
    />
  );
}

export default DataGrid;