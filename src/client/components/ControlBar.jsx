/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import PlayPauseButton from './PlayPauseButton';
import ScaleSelector from './ScaleSelector';
// import TempoSelector from './TempoSelector';
// import TimeDisplay from './TimeDisplay';

const ControlBar = React.memo(({
  selectedScale, dispatch, localUserId, isPlaying, // position,
}) => (
  <div className="NavBar">
    <ul>
      <PlayPauseButton dispatch={dispatch} localUserId={localUserId} isPlaying={isPlaying} />
      <ScaleSelector dispatch={dispatch} localUserId={localUserId} selectedScale={selectedScale} />
      {/* <TempoSelector dispatch={dispatch} /> */}
      {/* <TimeDisplay position={position} /> */}
    </ul>
  </div>
));

ControlBar.propTypes = {
  // position: PropTypes.string.isRequired,
  selectedScale: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default ControlBar;
