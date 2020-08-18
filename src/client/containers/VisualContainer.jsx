import React from 'react';
import ControlBar from '../components/ControlBar'
import InstrumentColumn from '../components/InstrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';

const VisualContainer = ({
    scales, selectedScale,
    numRows, numColumns, curStepColNum, gridState, dispatch, 
    instruments, localUserId, selectedInstr
  }) => {
  return (
    <div className="body">
      <div className="VisualContainer">
        <ControlBar 
          scales={scales}
          selectedScal={selectedScale}
        />
        <div className="row">
          <div className="column">
            <InstrumentColumn 
              instruments={instruments}
              localUserId={localUserId}
              selectedInstr={selectedInstr}
              dispatch={dispatch}
            />
            <Knobs />
          </div>
            <Board 
              numRows={numRows} 
              numColumns={numColumns} 
              curStepColNum={curStepColNum} 
              gridState={gridState}
              dispatch={dispatch}
            />
        </div>
      </div>
    </div>
  )
}

export default VisualContainer;