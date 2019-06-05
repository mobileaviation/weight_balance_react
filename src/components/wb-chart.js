import React from 'react'
import WBChartGrid from './wbChartGrid'
import Envelope from './envelope';
import {Layer, Stage} from 'react-konva';

class WBChart extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props = {
            width: 400,
            height: 400,
            aircraft: {}
        };
    }

    render()
    {
        return (
            <div>
                <Stage  width={this.props.width} height={this.props.height} >
                    <Layer>
                        <WBChartGrid 
                            width={this.props.width} 
                            height={this.props.height}
                            aircraft={this.props.aircraft}
                        />
                        <Envelope
                            width={this.props.width} 
                            height={this.props.height}
                            aircraft={this.props.aircraft}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default WBChart;