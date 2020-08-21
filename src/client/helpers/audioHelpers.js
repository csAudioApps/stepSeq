import * as Tone from 'tone';
import scales from '../constants/scales';

export const updateNoteArray = (grid, scaleNum, rootOctaveNum) => {
  const retArr = [];
  let curNote;
  let oct;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].length > 0) {
      curNote = grid[i][0] % 7;
      // console.log("updateNoteArray -> curNote", curNote)

      oct = Math.floor(grid[i][0] / 7) + rootOctaveNum;
      // console.log("updateNoteArray -> oct", oct)

      retArr[i] = scales[scaleNum][curNote].toString() + oct.toString();
    }
    else {
      retArr[i] = null;
    }
  }
  console.log(retArr);
  return retArr;
};

export const togglePlayback = async (e) => {
  await Tone.start();

  if (Tone.Transport.state === 'stopped' || Tone.Transport.state === 'paused') {
    Tone.Transport.start();
  }
  else {
    Tone.Transport.pause();
  }
};
