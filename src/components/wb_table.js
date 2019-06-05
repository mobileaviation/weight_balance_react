import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';




class WBTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            columnDefs: [
                {headerName: "Make", field: "make", width:100},
                {headerName: "Model", field: "model" , width:100},
                {headerName: "Price", field: "price" , width:100},
            ],
            rowData: [
                {make: "Toyota", model: "Celica", price: 30000},
                {make: "Ford", model: "Mondeo", price: 32000},
                {make: "Porsche", model: "Boxter", price: 72000},
            ]
        }
    }

    _getRowStyle = params => {
        if (params.node.rowIndex % 2 === 0) {
            return {background: 'red'};
        }
    }

    render() {
        let gridOptions = {
            getRowStyle : this._getRowStyle
        }
        return (
            <div className="ag-theme-balham"
                    style={{ height: '200px', width: '400px' }}>
                <AgGridReact
                    columnDefs = {this.state.columnDefs}
                    rowData = {this.state.rowData}
                    gridOptions = {gridOptions}
                />
            </div>
        )
    }
}

export default WBTable;