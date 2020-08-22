import React from 'react';
import ControlBar from '../components/ControlBar';
import InstrumentColumn from '../components/InstrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';

const VisualContainer = ({
  scales, selectedScale, isPlaying,
  numRows, numColumns, curStepColNum, gridState, dispatch,
  instruments, localUserId, selectedInstr,
}) => (
  <div className="body">
    <div className="VisualContainer">
      <ControlBar
        scales={scales}
        localUserId={localUserId}
        selectedScale={selectedScale}
        dispatch={dispatch}
        isPlaying={isPlaying}
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
);

export default VisualContainer;
