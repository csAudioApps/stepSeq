import React from 'react';
import { togglePlayback } from '../helpers/audioHelpers';
import { SET_SELECTED_SCALE } from '../reducer/reducerConstants';

const ControlBar = React.memo(({
  scales, selectedScale, dispatch, localUserId,
}) => {
  console.log('ControlBar -> selectedScale', selectedScale);

  return (
    <div className="NavBar">
      <ul>
        <li><button onClick={togglePlayback} className="btn-play-pause">Play | Pause</button></li>
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

export default ControlBar;
