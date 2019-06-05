import React from 'react';
import {Layer, Rect, Stage, Group, Shape, Star} from 'react-konva';
import Konva from 'konva';

class Test extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            color: 'green'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    }

    render()
    {      
        let scale = Math.random();
          return (
            // <Shape fill='#00D2FF' draggable
            //     sceneFunc={function (ctx) {
            //         ctx.beginPath();
            //         ctx.moveTo(20, 50);
            //         ctx.lineTo(220, 80);
            //         ctx.quadraticCurveTo(150, 100, 260, 170);
            //         ctx.closePath();
            //         // Konva specific method
            //         ctx.fillStrokeShape(this);
            //     }}
            // />
            
            <Star
                x={Math.random() * 400}
                y={Math.random() * 400}
                numPoints={5}
                innerRadius={30}
                outerRadius={50}
                fill='#86B717'
                opacity={0.8}
                draggable={true}
                scaleX={scale}
                scaleY={scale}
                rotation = {Math.random() * 180}
                shadowColor = 'black'
                shadowBlur={10}
                shadowOffsetX={5}
                shadowOffsetY={5}
                shadowOpacity={0.6}
            />
          )
    }
}

export default Test;