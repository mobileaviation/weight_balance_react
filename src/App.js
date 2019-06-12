import React from 'react';
import './App.scss';
import Aircraft from './Aircraft/Aircraft';
// import WBViews from './components/wb_views';
// import * as WB from './wb/wbObject';
// import WBInputTable from './components/wb_inputtable';
// import FB from './Aircraft/fb';
import BaseView from './BaseView';


function App() {
  let aircraft = new Aircraft();
  aircraft.getAircraftByCallSign("PH-DRT");

  return (
    <div className="App">
      <BaseView Aircraft={aircraft}/>
    </div>
  );
}

export default App;
