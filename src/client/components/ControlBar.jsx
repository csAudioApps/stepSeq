/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// import PropTypes from 'prop-types';
import * as Tone from 'tone';
import React from 'react';
import { Player } from 'tone';
import { togglePlayback } from '../helpers/audioHelpers';
import { SET_SELECTED_SCALE } from '../reducer/reducerConstants';

const ControlBar = React.memo(({
  scales, selectedScale, dispatch, localUserId,
}) => {
  console.log("Tone.Transport.state ", Tone.Transport.state )
  return (
    <div className="NavBar">
      <ul>
        <li>
          <button type="button" onClick={togglePlayback} className="btn-play-pause">
            {
              (Tone.Transport.state === 'stopped' || Tone.Transport.state === 'paused')
              ? 'Play'
              : 'Pause'
            }
          </button>
        </li>
        <li className="scales">Scales</li>
        {
          scales
            ? scales.map((item, i) => (
              <li
                className={selectedScale === i ? 'scale-btn-selected' : 'scale-btn'}
                onClick={() => dispatch({
                  type: SET_SELECTED_SCALE,
                  payload: { localUserId, selectedScale: i },
                })}
                key={`scaleBtn${i.toString()}`}
              >
                {i + 1}
              </li>
            ))
            : <p>Loading...</p>
        }
      </ul>
    </div>
  );
});

// ControlBar.propTypes = {
//   scales: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
//   selectedScale: PropTypes.number.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   localUserId: PropTypes.string.isRequired,
// }

export default ControlBar;

