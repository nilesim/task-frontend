import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";


type Column = {
    field: string;
    align: "left" | "center" | "right";
    title: string;
};

type ColumnData = {
    key: string;
    name: string;
    editable?: boolean;
}

type TableState = {
    data?: TableDataType;
    isLoading?: boolean;
    error?: string;
}

const initialState = {
    task: {} as TableState,
    recon: {} as TableState,
    scheduler: {} as TableState
};
type SuperState = typeof initialState;
export type TableNames = keyof SuperState;

type RowData = any;

type TableDataType = { columns: ColumnData[]; rows: RowData[] };
type TableSuccessParam = { tableName: TableNames, data: TableDataType };
type TableErrorParam = { tableName: TableNames, data: string };
export type TableRowUpdateParam = { tableName: TableNames, fromRow: number; toRow: number; updated: Record<string, string>; cellKey: string; };
const tableSlice = createSlice({
    name: "table",
    initialState: initialState,
    reducers: {
        fetchTableData(state, action: PayloadAction<TableNames>) {
            state[action.payload].isLoading = true;

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
        updateSelectedRows(state, action: PayloadAction<TableRowUpdateParam>) {
            const { tableName, fromRow: from, toRow: to, updated, cellKey } = action.payload;
            console.log(action);
            const tableData = state[tableName].data;
            if (tableData && tableData.rows) {
                const rows = [...tableData.rows];

                rows[from][cellKey] = updated[cellKey];

                tableData.rows = rows;
            }
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
                const columns = Object.keys(firstItem).map(colName => ({ key: colName, name: colName, editable: true } as ColumnData));
                const rows = tableData;
                const data = { columns, rows };
                dispatch(TableActions.fetchTableDataSuccess({ tableName, data }));
            }

        }
        catch (err) {
            dispatch(TableActions.fetchTableDataError({ tableName, data: err.toString() }));
        }
    }/*,
    async submitTableAddAsync (dispatch: Dispatch, payload:TableRowUpdateParam) {
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
