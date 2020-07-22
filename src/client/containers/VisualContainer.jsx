import React from 'react';
import NavBar from '../components/NavBar';
import InstrumentColumn from '../components/InstrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';

const VisualContainer = () => {
  return (
    <div className="body">
      <div className="VisualContainer">
        <NavBar />
        <div className="row">
          <div className="column">
            <InstrumentColumn />
            <Knobs />
          </div>
          <Board />
        </div>
      </div>
    </div>
  )
}

export default VisualContainer;