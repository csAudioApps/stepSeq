import React from 'react';
import { togglePlayback } from '../helpers/audioHelpers.js';

const ControlBar = ({scales, selectedScale}) => {

  // const scaleNums = scales.

  return (
    <div className="NavBar">
      <ul>
        <li><button onClick={togglePlayback} className="btn-play-pause">Play | Pause</button></li>
        <li className="scales">Scales</li>
        {
          scales 
          ? scales.map((item, i) => {
            return <li className='scale-nums' key={i}>{i+1}</li>;
          })
          : <p>Loading...</p>
        }
      </ul>
    </div>
  )
}

export default ControlBar;