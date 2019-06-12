import React from 'react';
import {Layer, Rect, Stage, Group, Shape, Star, Line, Text} from 'react-konva';

class WBChartGrid extends React.Component
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

    getHorizontalGridLines = () => {

        let padding = this.getPadding();
        let inc = this.getGridIncrease();  

        let _lines = [];
        let y1 = padding;
        let y2 = padding + (this.props.height - (padding*2)) + 5;
        for(let x=0; x<((this.props.width+10) - (padding*2)); x+=inc.incX ) {   
                  
            _lines.push( 
                <Line 
                    points={[padding + x, y1, padding + x, y2]}
                    stroke='#868686'
                    strokeWidth={1}
                />
            );
        }

        return _lines;
    }

    getVerticalGridLines = () => {
        let padding = this.getPadding();
        let inc = this.getGridIncrease();  

        let _lines = [];
        let x1 = padding-5;
        let x2 = padding + (this.props.width - (padding*2));
        for(let y=0; y<((this.props.height+10) - (padding*2)); y += inc.incY ) {   
                  
            _lines.push( 
                <Line 
                    points={[x1, padding + y, x2, padding + y]}
                    stroke='#868686'
                    strokeWidth={1}
                />
            );
        }
        return _lines;
    }

    getWeightText = () => {
        let padding = this.getPadding();
        let inc = this.getGridIncrease();  

        let pos = {
            x: padding-10,
            y: padding + (this.props.height - (padding*2))
        };

        let _weightText = [];

        for (let i=this.props.aircraft.weightStart; i<=this.props.aircraft.weightEnd; i+=this.props.aircraft.weightInc) {
            _weightText.push(
                <Text
                    x={pos.x-20}
                    y={pos.y-5}
                    text={i}
                    fontSize={11}
                    fontFamily='Arial'
                    align='left'
                 />
            )

            pos.y = pos.y - inc.incY;
        }

        return _weightText;
    }

    getCGText = () => {
        let padding = this.getPadding();
        let inc = this.getGridIncrease();  

        let pos = {
            x: padding,
            y: padding + (this.props.height - (padding*2))
        };

        let _cgText = [];

        for (let i=this.props.aircraft.cgStart; i<=this.props.aircraft.cgEnd; i+=this.props.aircraft.cgInc) {
            _cgText.push(
                <Text
                    x={pos.x-5}
                    y={pos.y+5}
                    text={i}
                    fontSize={11}
                    fontFamily='Arial'
                    align='left'
                 />
            )

            pos.x = pos.x + inc.incX;
        }

        return _cgText;
    }

    render()
    {
        let padding = this.getPadding();
        let _Hlines = this.getHorizontalGridLines();
        let _VLines = this.getVerticalGridLines();
        let _WTexts = this.getWeightText();
        let _CGTexts = this.getCGText();

        return(
            <Group>
                <Rect 
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height}
                    fill='#CCFF66'
                />
                <Rect
                    x={padding}
                    y={padding}
                    width={this.props.width-(padding*2)}
                    height={this.props.height-(padding*2)}
                    fillLinearGradientStartPointX={0}
                    fillLinearGradientStartPointY={0}
                    fillLinearGradientEndPointX={0}
                    fillLinearGradientEndPointY={this.props.height-(padding*2)}
                    fillLinearGradientColorStops={[0, '#58D3FF', 1, '#FCEAF9']}
                />
                {_Hlines}
                {_VLines}
                {_WTexts}
                {_CGTexts}
                <Text
                    x={5}
                    width={this.props.width}
                    y={this.props.height}
                    align='center'
                    text='Weight (lbs)'
                    fontFamily='Arial'
                    fontSize={11}
                    fontStyle='bold'
                    rotationDeg={270}
                />
                <Text
                    width={this.props.width}
                    x={0}
                    y={this.props.height-padding+20}
                    align='center'
                    text='CG Location (in)'
                    fontFamily='Arial'
                    fontSize={11}
                    fontStyle='bold'
                />
                <Text
                    width={this.props.width}
                    x={0}
                    y={10}
                    align='center'
                    text='Weight & Balance envelope'
                    fontFamily='Arial'
                    fontSize={12}
                    fontStyle='bold'
                />
            </Group>
        )
    }
}

export default WBChartGrid;