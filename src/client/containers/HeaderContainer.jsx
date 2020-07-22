import React from 'react';
import Share from '../components/Share';
import Users from '../components/Users';
import "regenerator-runtime/runtime.js";
import * as Tone from "tone";

const HeaderContainer = () => {

  const seqLen = 16;
  let playing = false;
  Tone.Transport.bpm.value = 180;

  const bassTrack = { 
    name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    ] 
  };

  const drumTrack = { name: "Drums", soundPreset: "BasicDrumset", mono: null, legato: false, grid: [
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    ]
  };

  const scales = [
    ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
    // ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'B'],
    ['B', 'Ab', 'G', 'F', 'Eb', 'Db', 'C'],
    ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
    ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
    ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    ['C', 'Db', 'Eb', 'F', 'Gb', 'Aa', 'Bb'],
  ];

  // Bass Synth
  const bassSynth = new Tone.Synth().toDestination();
  const bassNoteArr = [];
  for(let i = 0; i < seqLen; i++) {
    for(let j = 0; j < bassTrack.grid.length; j++) {
      if(bassTrack.grid[j][i] === 1) {
        bassNoteArr[i] = scales[3][j].toString() + '2';
      }
    }
  }
  // console.log("HeaderContainer -> bassNoteArr", bassNoteArr)

  const bassSynthSeq = new Tone.Sequence( (time, note) => {
    bassSynth.triggerAttackRelease(note, '16n', time);
  }, bassNoteArr).start(0);

  // Drum Synth
  const drumSynth = new Tone.MembraneSynth().toDestination();
  const drumSynthSeq = new Tone.Sequence((time, note) => {
    drumSynth.triggerAttackRelease(note, '16n', time);
  }, ['A-1', null, null, 'G-1', 'A-1', null, null, 'C-1']).start(0);

  // Poly Synth
  // const polySynth = new Tone.PolySynth().toDestination();
  // polySynth.set({ detune: -1200 });
  // const polyPart = new Tone.Sequence((time, note) => {
  //   polySynth.triggerAttackRelease(note, '8n', time);
  // }, [["C", "Eb", "G"], null, null, null, null, null, null, null]).start(0);

  // Drum Sampler
  const sampler = new Tone.Sampler({
    urls: {
      C1: "../audio/wamb_mbasefree_006.wav"
    },
    onload: () => {
      sampler.triggerAttackRelease(["C1"], 0.5);
    },
  });
  
  function handleClick(e) {
    console.log('audio toggle')
    // Tone.Transport.toggle;

    if (!playing) {
      Tone.Transport.start();
      playing = true;
    } 
    else {
      Tone.Transport.pause();
      playing = false;
    }
  }

  return (
    <div className="HeaderContainer">
      <div id="time"></div>
      <div id="seconds"></div>
      <button onClick={handleClick}>TOGGLE SICK BEATS</button>
      <Share />
      <Users />

    </div>
  )
}

export default HeaderContainer;