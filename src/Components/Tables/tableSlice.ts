import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { ColDef } from "@material-ui/data-grid";


type Column = {
    field: string;
    headerName: string;
    width: number;
    type?: undefined;
    description?: undefined;
    sortable?: undefined;
    valueGetter?: undefined;
};

type ColumnData = {
    field: string;
    headerName: string;
    width?: number;
    type?: undefined;
    description?: undefined;
    sortable?: undefined;
    valueGetter?: undefined;
}

type TableState = {
    data?: TableDataType;
    isLoading?: boolean;
    error?: string;
    onEdit?: boolean;
    rowsToDelete?: RowData[];
    rowToEdit?: RowData;
}

const initialState = {
    task: {} as TableState,
    recon: {} as TableState,
    scheduler: {} as TableState
};
type SuperState = typeof initialState;
export type TableNames = keyof SuperState;

type RowData = any;

type TableDataType = { columns: ColDef[]; rows: RowData[] };
type TableSuccessParam = { tableName: TableNames, data: TableDataType };
type TableErrorParam = { tableName: TableNames, data: string };
type TableSelectedRowsParam = { tableName: TableNames, data: any[]};
type TableSelectedRowParam = { tableName: TableNames, data: RowData };
type TableEditRowParam = { tableName: TableNames, key: string, value: string };

export type TableRowUpdateParam = { tableName: TableNames, fromRow: number; toRow: number; updated: Record<string, string>; cellKey: string; };

const tableSlice = createSlice({
    name: "table",
    initialState: initialState,
    reducers: {
        fetchTableData(state, action: PayloadAction<TableNames>) {
            state[action.payload].isLoading = true;
            state[action.payload].onEdit = false;

        },
        fetchTableDataSuccess(state, action: PayloadAction<TableSuccessParam>) {
            const { tableName, data } = action.payload;
            state[tableName].isLoading = false;
            state[tableName].data = data;
        },
        fetchTableDataError(state, action: PayloadAction<TableErrorParam>) {
            const { tableName, data } = action.payload;
            state[tableName].isLoading = false;
            state[tableName].error = data;
        },
        setSelectedRow(state, action: PayloadAction<TableSelectedRowParam>) {
            const { tableName, data } = action.payload;
            state[tableName].rowToEdit = data;
            state[tableName].onEdit=true;
        },
        changeSelectedRow(state, action: PayloadAction<TableEditRowParam>) {
            const { tableName, key, value } = action.payload;
            state[tableName].rowToEdit[key] = value;
        },
        cancelEdit(state, action: PayloadAction<TableNames>) {
            state[action.payload].onEdit = false;
            state[action.payload].rowToEdit = {};
        },
        setRowsToDelete(state, action: PayloadAction<TableSelectedRowsParam>) {
        
            const { tableName, data } = action.payload;
            const tableData = state[tableName].data;
            const rowIds = data.map(x => x.toString());

            if (tableData) {
                const rows = tableData.rows || [];

                const filtered = rows.filter(val => {
                   return rowIds.includes((val.id || "").toString());
                });

                state[tableName].rowsToDelete = [...filtered];
            }
            console.log("selected rows:");
            console.log(state[tableName].rowsToDelete);
        }
    }
});


export const TableActions = {
    ...tableSlice.actions,
    async fetchTableDataAsync(dispatch: Dispatch, tableName: TableNames) {
        dispatch(TableActions.fetchTableData(tableName));

        try {
            const response = await fetch('http://localhost:3000/' + tableName);
            const tableData = await response.json() as any[];

            if (Array.isArray(tableData) && tableData.length > 0) {
                const firstItem = tableData[0];
                let columns = Object.keys(firstItem).map(colName => ({
                    field: colName,
                    headerName: colName,
                    width: 250
                } as ColDef));

                const rows = tableData.map((rowData, index) => {
                    return { id: index + 1, ...rowData };
                });
                const data = { columns, rows };
                dispatch(TableActions.fetchTableDataSuccess({ tableName, data }));
            }
        }
        catch (err) {
            dispatch(TableActions.fetchTableDataError({ tableName, data: err.toString() }));
        }
    },
    async submitTableDeleteAsync(dispatch: Dispatch, tableName: TableNames, payload: RowData[]) {
        try {
            const response = await fetch('http://localhost:3000/' + tableName, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payload
                })
            });
            TableActions.fetchTableDataAsync(dispatch, tableName);

            ///
            // const deletedTask: Task = await response.json();
            //props.deleteItemFromState(task_id);
        }
        catch (err) {
            console.error(err);
            //TODO: give the error to user
            dispatch(TableActions.fetchTableDataError({ tableName, data: err.toString() }));
        }

    },
    async submitTableEditAsync(dispatch: Dispatch, tableName: TableNames, payload: RowData) {
        try {
            const response = await fetch('http://localhost:3000/' + tableName, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payload
                })
            });
            TableActions.fetchTableDataAsync(dispatch, tableName);
        }
        catch (err) {
            console.error(err);
            //TODO: give the error to user
            dispatch(TableActions.fetchTableDataError({ tableName, data: err.toString() }));
        }

    }
    /*,
    async submitTableAddAsync (dispatch: Dispatch, tableName: TableNames, payload:TableRowUpdateParam) {
        const { tableName, fromRow: from, toRow: to, updated, cellKey } = payload;
        dispatch(TableActions.fetchTableData(tableName));
        const tableData = await response.json() as any[];

            if (Array.isArray(tableData) && tableData.length > 0) {
                const firstItem = tableData[0];
                const columns = Object.keys(firstItem).map(colName => ({ key: colName, name: colName, editable: true } as ColumnData));
                const rows = tableData;
                const data = { columns, rows };
            }

        fetch('http://localhost:3000/' + tableName, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            TASK_ID: form.TASK_ID,
            task_version_id: form.task_version_id ,
            source_1_reporting_name:  form.source_1_reporting_name,
            source_2_filter: form.source_2_filter 
          })
        })
          .then(response => response.json())
          .catch(err => console.log(err))
      }*/
};

export default tableSlice.reducer;
