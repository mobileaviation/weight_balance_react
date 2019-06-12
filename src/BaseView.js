import React from 'react';
import WBViews from './components/wb_views';
import * as WB from './wb/wbObject';
import WBInputTable from './components/wb_inputtable';
import FB from './Aircraft/fb';
import Aircraft from './Aircraft/Aircraft';
import './BaseView.scss';

class BaseView extends React.Component {
    constructor(props)
    {
        super(props);
        this._OnDataReceived = this._OnDataReceived.bind(this);
        this._OnAircraftSelected = this._OnAircraftSelected.bind(this);
        this.state = { 
            aircraft : this.props.Aircraft,
            data: undefined };
        this.fb = new FB();
    }

    _OnDataReceived(data) {
        this.setState((state, props) => {
            return { data: data };
        });
    }

    _OnAircraftSelected(e)
    {
        let aa = new Aircraft();
        aa.getAircraftByData(JSON.parse(e.target.value));
        this.setState({aircraft: aa});
    }

    _getAircraftDropdown()
    {
        console.log(this.state.data);
        if (this.state.data === undefined) {
            return (<div></div>);
        }
        else
        {
            return (
                <select className='aircraftSelect' onChange={this._OnAircraftSelected}>
                    {this.state.data.map((craft) => <option key={craft.call_sign} value={JSON.stringify(craft)}>
                        {craft.call_sign}
                    </option>)}
                </select>
            );
        }
    }

    componentDidMount() {
        this.fb.getData(this._OnDataReceived)
    }

    render() {
        let w = 400;
        let h = 400;

        return (
            <div className='baseView'>
                <div className='selectView'> 
                    {this._getAircraftDropdown()} 
                </div>
                <div className='chartView'>
                    <WBViews 
                    width = {w}
                    height = {h}
                    aircraft = {this.state.aircraft}
                    />
                </div>
                <div>
                    <WBInputTable inputData={WB.getWBTestInObjects()}/>
                </div>
            </div>
        );
    }
}

export default BaseView;