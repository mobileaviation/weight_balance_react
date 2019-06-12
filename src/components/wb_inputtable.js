import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import './chart/wbChartGrid.scss'

class WBInputTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: props.inputData,
            columnDefsWeight: [
                {headerName: "", field: "leftheaderw", width:89, cellStyle: {"text-align": "left"}},
                {headerName: "lbs", field: "lbs1" , width:60, type: "numericColumn", editable:true, 
                    cellEditorSelector:this._cellEditor },
                {headerName: "kg", field: "kg1" , width:50, type: "numericColumn", editable:true,
                    cellEditorSelector:this._cellEditor },
                {headerName: "", field: "midheaderw" , width:89,cellStyle: {"text-align": "left"}},
                {headerName: "lbs", field: "lbs2" , width:60, type: "numericColumn", editable:true,
                    cellEditorSelector:this._cellEditor },
                {headerName: "kg", field: "kg2" , width:50, type: "numericColumn", editable:true, 
                    cellEditorSelector:this._cellEditor }
            ],
            columnDefsFuel: [
                {headerName: "", field: "leftheaderf", width:89, cellStyle: {"text-align": "left"}},
                {headerName: "USG", field: "usg1" , width:60, type: "numericColumn", editable:true, 
                    cellEditorSelector:this._cellEditor },
                {headerName: "L", field: "liter1" , width:50, type: "numericColumn", editable:true,
                    cellEditorSelector:this._cellEditor },
                {headerName: "", field: "midheaderf" , width:89,cellStyle: {"text-align": "left"}},
                {headerName: "USG", field: "usg2" , width:60, type: "numericColumn", editable:true,
                    cellEditorSelector:this._cellEditor },
                {headerName: "L", field: "liter2" , width:50, type: "numericColumn", editable:true, 
                    cellEditorSelector:this._cellEditor }
            ],
            rowDataWeight: [],
            rowDataFuel: []
        };
        this._onCellEditing = this._onCellEditing.bind(this);
    }

    _cellEditor = params => {
        //console.log(params.colDef.field);
        return { component: 'numericCellEditor' };
    }

    _onCellEditing(event)
    {
        console.log(event);
        if (event.colDef.field==="lbs1") event.data.dataL.lbs = parseInt(event.value);
        if (event.colDef.field==="kg1") event.data.dataL.kilo = parseInt(event.value);
        if (event.colDef.field==="lbs2") event.data.dataR.lbs = parseInt(event.value);
        if (event.colDef.field==="kg2") event.data.dataR.kilo = parseInt(event.value);
        if (event.colDef.field==="usg1") event.data.dataL.usg = parseInt(event.value);
        if (event.colDef.field==="liter1") event.data.dataL.liter = parseInt(event.value);
        if (event.colDef.field==="usg2") event.data.dataR.usg = parseInt(event.value);
        if (event.colDef.field==="liter2") event.data.dataR.liter = parseInt(event.value);
        this.setState((state, props) => {
            localStorage.setItem("WBObject", JSON.stringify(props.inputData));
            return {data: props.inputData};
        });
    }

    _setRowData(inputData) {
        this.state.rowDataWeight = [];
        this.state.rowDataFuel = [];
        let row = this._setWeightRow(inputData[0], inputData[1]);
        this.state.rowDataWeight.push(row);
        row = this._setWeightRow(inputData[2], inputData[3]);
        this.state.rowDataWeight.push(row);
        row = this._setWeightRow(inputData[4], undefined);
        this.state.rowDataWeight.push(row);

        row = this._setFuelRow(inputData[6], inputData[7]);
        this.state.rowDataFuel.push(row);
        row = this._setFuelRow(inputData[8], undefined);
        this.state.rowDataFuel.push(row);
        row = this._setFuelRow(inputData[9], undefined);
        this.state.rowDataFuel.push(row);
    }

    _setWeightRow(dataL, dataR)
    {
        let row = new Object;
        row.leftheaderw = dataL.name;
        row.lbs1 = Math.round(dataL.lbs);
        row.kg1 = Math.round(dataL.kilo);
        row.dataL = dataL;
        if (dataR !== undefined) {
            row.midheaderw = dataR.name;
            row.lbs2 = Math.round(dataR.lbs);
            row.kg2 = Math.round(dataR.kilo);
            row.dataR = dataR;
        }
        return row;
    }

    _setFuelRow(dataL, dataR)
    {
        let row = new Object;
        row.leftheaderf = dataL.name;
        row.usg1 = Math.round(dataL.usg);
        row.liter1 = Math.round(dataL.liter);
        row.dataL = dataL;
        if (dataR !== undefined) {
            row.midheaderf = dataR.name;
            row.usg2 = Math.round(dataR.usg);
            row.liter2 = Math.round(dataR.liter);
            row.dataR = dataR;
        }
        return row;
    }

    render() {
        console.log("render...");
        console.log(this.props.inputData);
        this._setRowData(this.props.inputData);
        let gridOptionsWeight = {
            components: { numericCellEditor: NumericCellEditor },
            onCellEditingStopped: this._onCellEditing
        }
        return (
            <div>
                <div className="ag-theme-fresh"
                        style={{ height: '103px', width: '400px' }}>
                    <AgGridReact
                        columnDefs = {this.state.columnDefsWeight}
                        rowData = {this.state.rowDataWeight}
                        gridOptions = {gridOptionsWeight}
                    />
                </div>
                <div className="ag-theme-fresh"
                        style={{ height: '103px', width: '400px' }}>
                    <AgGridReact
                        columnDefs = {this.state.columnDefsFuel}
                        rowData = {this.state.rowDataFuel}
                        gridOptions = {gridOptionsWeight}
                    />
                </div>
            </div>
        )
    }   
}

function getCharCodeFromEvent(event) {
    event = event || window.event;
    return (typeof event.which == "undefined") ? event.keyCode : event.which;
}

function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
    var charCode = getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return isCharNumeric(charStr);
}


// function to act as a class
function NumericCellEditor() {
}

// gets called once before the renderer is used
NumericCellEditor.prototype.init = function (params) {
    // create the cell
    this.eInput = document.createElement('input');

    if (isCharNumeric(params.charPress)) {
        this.eInput.value = params.charPress;
    } else {
        if (params.value !== undefined && params.value !== null) {
            this.eInput.value = params.value;
        }
    }

    var that = this;
    this.eInput.addEventListener('keypress', function (event) {
        if (!isKeyPressedNumeric(event)) {
            that.eInput.focus();
            if (event.preventDefault) event.preventDefault();
        } else if (that.isKeyPressedNavigation(event)){
            event.stopPropagation();
        }
    });

    // only start edit if key pressed is a number, not a letter
    var charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
    this.cancelBeforeStart = charPressIsNotANumber;
};

NumericCellEditor.prototype.isKeyPressedNavigation = function (event){
    return event.keyCode===39
        || event.keyCode===37;
};


// gets called once when grid ready to insert the element
NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
};

// focus and select can be done after the gui is attached
NumericCellEditor.prototype.afterGuiAttached = function () {
    this.eInput.focus();
};

// returns the new value after editing
NumericCellEditor.prototype.isCancelBeforeStart = function () {
    return this.cancelBeforeStart;
};

// example - will reject the number if it contains the value 007
// - not very practical, but demonstrates the method.
NumericCellEditor.prototype.isCancelAfterEnd = function () {
    var value = this.getValue();
    return value.indexOf('007') >= 0;
};

// returns the new value after editing
NumericCellEditor.prototype.getValue = function () {
    return this.eInput.value;
};

export default WBInputTable;