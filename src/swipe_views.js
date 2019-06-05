import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import WBChart from './components/wb-chart';
import WBTable from './components/wb_table';

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
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
            width: 400,
            height: 400,
            aircraft: {}
        };
  }

  render() {
    return (
      <SwipeableViews enableMouseEvents>
        <div>
          <WBChart
                width = {this.props.width}
                height = {this.props.height}
                aircraft = {this.props.aircraft}
              />
        </div>
        <div>
          <WBTable />
        </div>
      </SwipeableViews>
    );
  }

}

export default WBViews;