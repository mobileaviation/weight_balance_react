import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import WBChart from './chart/wb-chart';
//import WBOutputTable from './wb_outputtable';
//import Pagination from 'd'

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
    width: 400
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

class WBViews extends React.Component
{
  constructor(props)
  {
    super(props);
        this.props = {
            width: 0,
            height: 0,
            aircraft: {}
        };
  }

  render() {
    return (
      <div>
      <SwipeableViews enableMouseEvents>
        <div>
          <WBChart
            width = {this.props.width}
            height = {this.props.height}
            aircraft = {this.props.aircraft}
          />
        </div>
        <div>
          Dit is een test
        </div>
      </SwipeableViews>
      {/* <Pagination dots={3} /> */}
      </div>
    );
  }

}

export default WBViews;