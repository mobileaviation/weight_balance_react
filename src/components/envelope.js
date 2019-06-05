import React from 'react';
import {Group, Line, Rect, Text} from 'react-konva';

class Envelope extends React.Component {
    constructor(props)
    {
        super(props)
        this.props = {
            width: 400,
            height: 400,
            aircraft : {}
        };
    }

    getPadding = () => {
        return this.props.width/8;
    }

    getGridIncrease = () =>
    {
        let padding = this.getPadding();
        let gridXInc = (this.props.width - (padding*2)) / ((this.props.aircraft.cgEnd/this.props.aircraft.cgInc)-(this.props.aircraft.cgStart/this.props.aircraft.cgInc));
        let gridYInc = (this.props.height - (padding*2)) / ((this.props.aircraft.weightEnd/this.props.aircraft.weightInc)-(this.props.aircraft.weightStart/this.props.aircraft.weightInc));

        let inc = {
            incX: gridXInc,
            incY: gridYInc
        }

        return inc;
    }

    calculatePos = (weightVal, cgVal) =>
    {
        let inc = this.getGridIncrease();
        let padding = this.getPadding();
        
        let weightFac = (weightVal - this.props.aircraft.weightStart) / this.props.aircraft.weightInc;
        let y = this.props.height - (padding + (inc.incY * weightFac));

        let cgFac = (cgVal - this.props.aircraft.cgStart) / this.props.aircraft.cgInc;
        let x = padding + (inc.incX * cgFac);

        return { x: x, y: y };
    }

    render()
    {
        let pos1 = this.calculatePos(this.props.aircraft.data.bew, this.props.aircraft.data.fwd);
        let pos2 = this.calculatePos(this.props.aircraft.data.bew, this.props.aircraft.data.aft);
        let pos3 = this.calculatePos(this.props.aircraft.data.mtow, this.props.aircraft.data.aft);
        let pos4 = this.calculatePos(this.props.aircraft.data.mtow, this.props.aircraft.data.mtowFwd);
        let pos5 = this.calculatePos(this.props.aircraft.data.fwdW, this.props.aircraft.data.fwd);
        
        let util_fwd = this.props.aircraft.data.fwd + ((this.props.aircraft.data.mtow-this.props.aircraft.data.fwdW) / 
            ((this.props.aircraft.data.maxUtilW-this.props.aircraft.data.fwdW) * 
            (this.props.aircraft.data.mtowFwd-this.props.aircraft.data.fwd)));

        let pos7 = this.calculatePos(this.props.aircraft.data.maxUtilW, util_fwd);
        let pos8 = this.calculatePos(this.props.aircraft.data.maxUtilW, this.props.aircraft.data.aft);
        

        return(
            <Group>
                <Text
                    x={pos4.x-10}
                    width={pos3.x-pos4.x}
                    y={((pos8.y - pos3.y)/2) + pos3.y -10}
                    align='right'
                    text='Normal'
                    fontFamily='Arial'
                    fontSize={14}
                />
                <Text
                    x={pos4.x-10}
                    width={pos3.x-pos4.x}
                    y={((pos2.y - pos8.y)/2) + pos8.y}
                    align='right'
                    text='Utility'
                    fontFamily='Arial'
                    fontSize={14}
                />
                <Line 
                    points={[pos1.x,pos1.y,
                        pos2.x, pos2.y,
                        pos3.x, pos3.y,
                        pos4.x, pos4.y,
                        pos5.x, pos5.y,
                        pos1.x, pos1.y]}
                    stroke='#C00000'
                    strokeWidth={2}
                />
                <Line
                    points={[pos7.x,pos7.y,
                        pos8.x, pos8.y]}
                    stroke='#C00000'
                    strokeWidth={2}
                />
                <Rect 
                    x={pos1.x-3}
                    y={pos1.y-3}
                    width={7}
                    height={7}
                    fill='#C00000'
                />
                <Rect 
                    x={pos2.x-3}
                    y={pos2.y-3}
                    width={7}
                    height={7}
                    fill='#C00000'
                />
                <Rect 
                    x={pos3.x-3}
                    y={pos3.y-3}
                    width={7}
                    height={7}
                    fill='#C00000'
                />
                <Rect 
                    x={pos4.x-3}
                    y={pos4.y-3}
                    width={7}
                    height={7}
                    fill='#C00000'
                />
                <Rect 
                    x={pos5.x-3}
                    y={pos5.y-3}
                    width={7}
                    height={7}
                    fill='#C00000'
                />
                <Rect 
                    x={pos7.x-3}
                    y={pos7.y-3}
                    width={7}
                    height={7}
                    fill='#C00000'
                />
                <Rect 
                    x={pos8.x-3}
                    y={pos8.y-3}
                    width={7}
                    height={7}
                    fill='#C00000'
                />

            </Group>
        );
    }
}

export default Envelope;
