import {scales} from '../constants/scales.js'
import * as Tone from "tone";

export const updateNoteArray = (grid, scaleNum) => {
  let retArr = [];

  for(let i =0; i < grid.length; i++) {
    let curNote = grid[i][0];
    curNote != null 
      ? retArr[i] = scales[scaleNum][curNote].toString() + '2'
      : retArr[i] = null;
  }
  return retArr;
}

export const playPause = (e) => {
  if (Tone.Transport.state === "stopped" || Tone.Transport.state === "paused") {
    Tone.Transport.start();
  }
  else {
    Tone.Transport.pause();
  }
}