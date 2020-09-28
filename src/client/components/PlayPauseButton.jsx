import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toggleToneTransport } from '../helpers/audioHelpers';
import { TOGGLE_PLAY_STATE } from '../reducer/reducerConstants';

const PlayPauseButton = React.memo(({ dispatch, localUserId, isPlaying }) => (
  <StyledLi>
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
  </StyledLi>
));

PlayPauseButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const StyledLi = styled.li`
  margin-left: 25px;
  align-self: center;
`;

const StyledPlayPauseButton = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 3px;
  background-color: #5b5b5b;
  color: #eaeaea;
  padding: 5px;
`;

export default PlayPauseButton;
