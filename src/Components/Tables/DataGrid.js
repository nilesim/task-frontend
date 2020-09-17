import React from "react";
import ReactDataGrid from "react-data-grid";
import "../../styles.css";

const columns = [
  { key: "id", name: "ID", editable: true },
  { key: "title", name: "Title", editable: true },
  { key: "complete", name: "Complete", editable: true },
  { key: "action", name: "Action" }
];

class DataGrid extends React.Component {
  state = {
    rows: [
      { index: 0, id: 0, title: "Task 1", complete: 20 },
      { index: 1, id: 1, title: "Task 2", complete: 40 },
      { index: 2, id: 2, title: "Task 3", complete: 60 }
    ]
  };

  getCellActions = (column, row) => {
    const cellActions = [
      {
        icon: <span className="glyphicon glyphicon-remove" />,
        callback: () => {
          const rows = [...this.state.rows];
          rows.splice(row.index, 1); //
          this.setState({ rows: rows });
        }
      }
    ];
    return column.key === "action" ? cellActions : null;
  };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.state.rows[i]}
        rowsCount={this.state.rows.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
        getCellActions={this.getCellActions}
      />
    );
  }
}

export default DataGrid;