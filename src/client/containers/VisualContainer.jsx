import React from 'react';
import PropTypes from 'prop-types';
import ControlBar from '../components/ControlBar';
import InstrumentColumn from '../components/InstrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';

const VisualContainer = React.memo(({
  localUserId, selectedScale, dispatch, isPlaying, // position,
  instruments, selectedInstr,
  numRows, numColumns, curStepColNum, gridState,
}) => (
  <div className="body">
    <div className="VisualContainer">
      <ControlBar
        localUserId={localUserId}
        selectedScale={selectedScale}
        dispatch={dispatch}
        isPlaying={isPlaying}
        // position={position}
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
));

export default VisualContainer;

VisualContainer.propTypes = {
  // position: PropTypes.string.isRequired,
  selectedScale: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  numRows: PropTypes.number.isRequired,
  numColumns: PropTypes.number.isRequired,
  curStepColNum: PropTypes.number.isRequired,
  gridState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  instruments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    soundPreset: PropTypes.string,
    mono: PropTypes.bool,
    legato: PropTypes.bool,
    grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  selectedInstr: PropTypes.number.isRequired,
};
