import React from 'react';
import NavBar from '../components/NavBar';
import InstrumentColumn from '../components/InstrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';

const VisualContainer = ({
    scales, selectedScale,
    numRows, numColumns, curStepColNum, gridState, toggleButtonState, 
    instruments,
  }) => {
  return (
    <div className="body">
      <div className="VisualContainer">
        <NavBar 
          scales={scales}
          selectedScal={selectedScale}
        />
        <div className="row">
          <div className="column">
            <InstrumentColumn 
              instruments={instruments}
            />
            <Knobs />
          </div>
            <Board 
              numRows={numRows} 
              numColumns={numColumns} 
              curStepColNum={curStepColNum} 
              gridState={gridState}
              toggleButtonState={toggleButtonState}
            />
        </div>
      </div>
    </div>
  )
}

export default VisualContainer;