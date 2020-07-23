import React, {useState, useEffect, useRef} from 'react';
import VisualContainer from './VisualContainer';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';
// import "regenerator-runtime/runtime.js";
import * as Tone from "tone";
import {updateNoteArray, playPause} from '../helpers/audioHelpers.js'
// import testSample from "../../server/audio/wamb_mbasefree_006.wav"

// ***** PULL FROM STATE *****
// const seqLen = 16;
Tone.Transport.bpm.value = 100;
let selectedScale = 2;

const drumTrack = { 
  name: "Drums", soundPreset: "BasicDrumset", mono: null, legato: false, grid:
    // [ [3], [3], [4], [], [0], [], [], [], [], [2], [], [0], [], [0], [1], [2] ] 
    [ [4], [], [], [], [], [], [], [], [4], [], [], [], [], [], [], [] ] 
};

const bassTrack = { 
name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: 
  [ [0], [3], [4], [], [0], [], [], [], [0], [2], [], [0], [], [0], [1], [2] ] 
};
// ***************************

const MainContainer = () => {
  const [isLoaded, setLoaded] = useState(false);
  const transport = useRef(null);
  const bassSynth = useRef(null);
  const drumSynth = useRef(null);
  const [step, setStep] = useState(0);
  // const sampler = useRef(null);

  useEffect(() => {

    // Transport
    transport.current = new Tone.Sequence((time, step) => {
      // console.log("MainContainer -> step", step)
      setStep(step);
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n").start(0);

    // Bass Synth
    bassSynth.current = new Tone.Synth().toDestination();
    const bassNoteArr = updateNoteArray(bassTrack.grid, selectedScale); 
    console.log("MainContainer -> bassNoteArr", bassNoteArr)
    const bassSynthSeq = new Tone.Sequence( (time, note) => {
      bassSynth.current.triggerAttackRelease(note, "8n", time);
    }, bassNoteArr).start(0);

    // Drum Synth
    drumSynth.current = new Tone.MembraneSynth().toDestination();
    // const drumNoteArr = updateNoteArray(drumTrack.grid, selectedScale);
    // const drumNoteArr = ['A-1', null, null, 'G-1', 'A-1', null, null, 'C-1'];
    const drumNoteArr = ['A-1', null, null, null, 'A-1', null, null, null];
    const drumSynthSeq = new Tone.Sequence((time, note) => {
      drumSynth.current.triggerAttackRelease(note, "8n", time);
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
      <HeaderContainer />
      <VisualContainer 
        numRows={15} 
        numColumns={16} 
        curStepColNum={step}
        gridState={bassTrack.grid} />
      <Footer />
    </div>
  )
}

export default MainContainer;


      // bassSynth.current = new Tone.Synth().toDestination();
      // bassSynth.current.triggerAttackRelease('C4', '16n')
      // console.log('Tone.now()', Tone.now());
      // console.log('Tone.Destination.blockTime', Tone.Destination.blockTime);
      // console.log('Tone.Transport.sampleTime', Tone.Transport.sampleTime);
      // console.log('Tone.Transport.progress', Tone.Transport.progress);


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
