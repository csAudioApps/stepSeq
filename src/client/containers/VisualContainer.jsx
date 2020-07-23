import React from 'react';
import NavBar from '../components/NavBar';
import InstrumentColumn from '../components/InstrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';

const VisualContainer = ({numRows, numColumns, curStepColNum, 
                  gridState, toggleButtonState, instruments}) => {
  return (
    <div className="body">
      <div className="VisualContainer">
        <NavBar />
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