import React from 'react';
import PropTypes from 'prop-types';
import { toggleToneTransport } from '../helpers/audioHelpers';
import { TOGGLE_PLAY_STATE } from '../reducer/reducerConstants';

const PlayPauseButton = React.memo(({ dispatch, localUserId, isPlaying }) => (
  <li>
    <button
      type="button"
      className="btn-play-pause"
      onClick={() => {
        if (toggleToneTransport()) {
          dispatch({ type: TOGGLE_PLAY_STATE, payload: { localUserId } });
        }
      }}
    >
      { isPlaying ? 'Pause' : 'Play' }
    </button>
  </li>
));

PlayPauseButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default PlayPauseButton;
