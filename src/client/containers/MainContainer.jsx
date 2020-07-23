import React, {useState, useEffect, useRef, useReducer} from 'react';
import VisualContainer from './VisualContainer';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';
// import "regenerator-runtime/runtime.js";
import * as Tone from "tone";
import {updateNoteArray, playPause} from '../helpers/audioHelpers.js';
import { initialState } from '../constants/initBoardState'
import { reducer } from '../reducer/reducer';
// import testSample from "../../server/audio/wamb_mbasefree_006.wav"
import { TOGGLE_GRID_BUTTON } from '../reducer/reducerConstants'

// ***** PULL FROM STATE *****
const seqLen = 16;
Tone.Transport.bpm.value = 180;
let selectedScale = 2;

const drumTrack = { 
  name: "Drums", soundPreset: "BasicDrumset", mono: null, legato: false, grid:
    [ [3], [3], [4], [], [0], [], [], [], [], [2], [], [0], [], [0], [1], [2] ] 
};

const bassTrack = { 
name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: 
  [ [5], [3], [4], [], [0], [], [], [], [], [2], [], [0], [], [0], [1], [2] ] 
};
const MainContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [isLoaded, setLoaded] = useState(false);
  const bassSynth = useRef(null);
  const drumSynth = useRef(null);
  // const sampler = useRef(null);

  useEffect(() => {
    // Bass Synth
    bassSynth.current = new Tone.Synth().toDestination();
    const bassNoteArr = updateNoteArray(bassTrack.grid, selectedScale); 
    const bassSynthSeq = new Tone.Sequence( (time, note) => {
      bassSynth.current.triggerAttackRelease(note, '16n', time);
    }, bassNoteArr).start(0);

    // Drum Synth
    drumSynth.current = new Tone.MembraneSynth().toDestination();
    const drumNoteArr = ['A-1', null, null, 'G-1', 'A-1', null, null, 'C-1']
    const drumSynthSeq = new Tone.Sequence((time, note) => {
      drumSynth.current.triggerAttackRelease(note, '16n', time);
    }, drumNoteArr).start(0);
  
    // Sampler
    // sampler.current = new Tone.Sampler({testSample}, {
    //   onload: () => { setLoaded(true); }
    // }).toMaster();

  }, []); 

  const handleClick = () => sampler.current.triggerAttack("testSample");

  return (
    <div className="MainContainer">
      {/* <button disabled={!isLoaded} onClick={handleClick}>Trigger Sample</button> */}
      <div id="time"></div>
      <div id="seconds"></div>
      <button onClick={playPause}>TOGGLE SICK BEATS</button>
      <button onClick={() => dispatch({
        type: TOGGLE_GRID_BUTTON, 
        payload: { x: 5, y: 3}
        })}>
        DISPATCH SICK PAYLOAD (grid button 5,3)
      </button>
      <HeaderContainer />
      <VisualContainer />
      <Footer />
    </div>
  )
}


  // Poly Synth
  // const polySynth = new Tone.PolySynth().toDestination();
  // polySynth.set({ detune: -1200 });
  // const polyPart = new Tone.Sequence((time, note) => {
  //   polySynth.triggerAttackRelease(note, '8n', time);
  // }, [["C", "Eb", "G"], null, null, null, null, null, null, null]).start(0);

  // Drum Sampler
  // const sampler = new Tone.Sampler({
  //   urls: {
  //     C1: "../audio/wamb_mbasefree_006.wav"
  //   },
  //   onload: () => {
  //     sampler.triggerAttackRelease(["C1"], 0.5);
  //   },
  // });

export default MainContainer;