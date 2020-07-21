import React from 'react';
import NavBar from '../components/NavBar';
import InstrumentColumn from '../components/InsrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';

const VisualContainer = () => {
  return (
    <div className="VisualContainer">
      <NavBar />
      <InstrumentColumn />
      <Board />
      <Knobs />
    </div>
  )
}

export default VisualContainer;