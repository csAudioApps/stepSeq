import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toggleToneTransport } from '../helpers/audioHelpers';
import { TOGGLE_PLAY_STATE } from '../reducer/reducerConstants';

const PlayPauseButton = React.memo(({ dispatch, localUserId, isPlaying }) => (
  <li>
    <StyledPlayPauseButton
      type="button"
      className="btn-play-pause"
      onClick={() => {
        if (toggleToneTransport()) {
          dispatch({ type: TOGGLE_PLAY_STATE, payload: { localUserId } });
        }
      }}
    >
      { isPlaying ? 'Pause' : 'Play' }
    </StyledPlayPauseButton>
  </li>
));

PlayPauseButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const StyledPlayPauseButton = styled.button`
  width: 80px;
  background-color: #5b5b5b;
  color: white;
  margin: 13px 0.5em 13px 25px;
  padding: 5px;
  float: left;
`;

export default PlayPauseButton;
