import React from 'react';
import { togglePlayback } from '../helpers/audioHelpers.js';
import { SET_SELECTED_SCALE } from '../reducer/reducerConstants'

const ControlBar = ({scales, selectedScale, dispatch, localUserId }) => {
console.log("ControlBar -> selectedScale", selectedScale)

  // const scaleNums = scales.

  return (
    <div className="NavBar">
      <ul>
        <li><button onClick={togglePlayback} className="btn-play-pause">Play | Pause</button></li>
        <li className="scales">Scales</li>
        {
          scales 
          ? scales.map((item, i) => {
            return <li className={selectedScale === i ? 'scale-btn-selected' : 'scale-btn'} 
                        onClick={() => dispatch({
                          type: SET_SELECTED_SCALE, 
                          payload: { localUserId: localUserId, selectedScale: i }
                        })}
                        key={i}>{i+1}</li>;
          })
          : <p>Loading...</p>
        }
      </ul>
    </div>
  )
}

export default ControlBar;