/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import PlayPauseButton from './PlayPauseButton';
import scales from '../constants/scales';
import { SET_SELECTED_SCALE } from '../reducer/reducerConstants';

const ControlBar = React.memo(({
  selectedScale, dispatch, localUserId, isPlaying,
}) => (
  <div className="NavBar">
    <ul>
      <li>
        <PlayPauseButton dispatch={dispatch} localUserId={localUserId} isPlaying={isPlaying} />
      </li>
      <li className="scales">Scale</li>
      {
          scales
            ? scales.map((item, scaleIndex) => (
              <li
                className={selectedScale === scaleIndex ? 'scale-btn-selected' : 'scale-btn'}
                onClick={() => dispatch({
                  type: SET_SELECTED_SCALE,
                  payload: { localUserId, selectedScale: scaleIndex },
                })}
                key={`scaleBtn${scaleIndex.toString()}`}
              >
                {scaleIndex + 1}
              </li>
            ))
            : <p>Loading...</p>
        }
    </ul>
  </div>
));

ControlBar.propTypes = {
  selectedScale: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default ControlBar;
