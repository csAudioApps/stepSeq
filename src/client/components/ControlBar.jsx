/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { number, func, string, bool } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import PlayPauseButton from './PlayPauseButton';
import ScaleSelector from './ScaleSelector';
import TempoSelector from './TempoSelector';
// import TimeDisplay from './TimeDisplay';

const ControlBar = React.memo(({ selectedScale, dispatch, localUserId, isPlaying, curTempo }) => (
  <ControlBarWrapper>
    <PlayPauseButton dispatch={dispatch} localUserId={localUserId} isPlaying={isPlaying} />
    <ScaleSelector dispatch={dispatch} localUserId={localUserId} selectedScale={selectedScale} />
    <TempoSelector dispatch={dispatch} curTempo={curTempo} />
    {/* <TimeDisplay position={position} /> */}
  </ControlBarWrapper>
));

ControlBar.propTypes = {
  // position: PropTypes.string.isRequired,
  selectedScale: number.isRequired,
  dispatch: func.isRequired,
  localUserId: string.isRequired,
  isPlaying: bool.isRequired,
  curTempo: number.isRequired,
};

const ControlBarWrapper = styled.ul`
  display: flex;
  height: 55px;
  border: 1px solid #444444;
`;

export default ControlBar;
