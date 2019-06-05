import React from 'react';
import './App.css';
import Aircraft from './Aircraft/Aircraft';
import WBViews from './swipe_views';
import * as WB from './wb/wbObject';

function App() {
  let aircraft = new Aircraft();
  aircraft.getAircraftByCallSign("PH-DRT");
  let w = 400;
  let h = 400;
  let t = new WB.Test();
  t.test();

  console.log(WB.getWBTestInObjects());

  return (
    <div className="App">
      <div className="swipe">
        <WBViews 
          width = {w}
          height = {h}
          aircraft = {aircraft}
        />
      </div>
    </div>
  );
}

export default App;
