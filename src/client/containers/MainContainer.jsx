import React, {useState, useEffect, useRef, useReducer} from 'react';
import VisualContainer from './VisualContainer';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';
// import "regenerator-runtime/runtime.js";
import * as Tone from "tone";
import {scales} from '../constants/scales.js'
import {updateNoteArray} from '../helpers/audioHelpers.js';
import { initialState } from '../constants/initBoardState'
import { reducer } from '../reducer/reducer';
// import testSample from "../../server/audio/wamb_mbasefree_006.wav"
import * as reducerConstants from '../reducer/reducerConstants'

import { initialState2 } from '../constants/initBoardState'
import { initialState3 } from '../constants/initBoardState'

import { socket } from '../helpers/socket';

import uuid from "uuid";




// ***** PULL FROM STATE *****
// const seqLen = 16;
Tone.Transport.bpm.value = 180;
let selectedScale = 2;

const drumTrack = { 
  name: "Drums", soundPreset: "BasicDrumset", mono: null, legato: false, grid:
    // [ [3], [3], [4], [], [0], [], [], [], [], [2], [], [0], [], [0], [1], [2] ] 
    [ [4], [], [], [], [4], [], [], [], [4], [], [], [], [4], [], [], [] ] 
};

const bassTrack = { 
name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: 
  [ [14], [4], [4], [13], [0], [14], [7], [], [0], [2], [7], [0], [7], [0], [1], [] ] 
  // [ [14], [3], [4], [13], [0], [14], [], [], [], [0], [], [0], [7], [0], [1], [] ] 
};
// ***************************

const MainContainer = () => {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const [isLoaded, setLoaded] = useState(false);
  const transport = useRef(null);
  const bassSynth = useRef(null);
  const drumSynth = useRef(null);
  const [step, setStep] = useState(0);
  // const sampler = useRef(null);
  
  // const toggleGridButton = () => 

  // open socket connection
  useEffect(() => {
    // get initial state
    console.log('socket: ', socket)
    socket.emit('getInitialState');
    // if we are first user, create state in the server
    // socket.on('firstUser', () => {
    //   console.log('first')
    //   socket.emit('updateServerState', state, socket.id);
    // })
    // when we receive and updated state from server, update local state
    // only update if update was sent fron another user
    socket.on('updateClientState', (msg, senderId) => {
      if (socket.id !== senderId){
        // console.log('***not equal****')
        dispatch({type: reducerConstants.SET_STATE_FROM_SOCKET, payload: msg})
      } else {
        // console.log('they are equal')
      }
    });

    const id = uuid.v4();
    dispatch({type: reducerConstants.ADD_USER, payload: {[id]: { userName: '', instrumentSelected: 1, color: 'red'}}})

    
    return () => socket.disconnect();
  }, []);

  // Transport
  Tone.Context.latencyHint = 'playback'
  transport.current = new Tone.Sequence((time, step) => {
    // console.log("MainContainer -> step", step)
    setStep(step);
  }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n").start(0);
  
  const dly = new Tone.FeedbackDelay("8n", 0.5).toDestination();
  const dist = new Tone.Distortion(0.4).connect(dly);
  // const shift = new Tone.FrequencyShifter(42).connect(dist);

  
  useEffect(() => {
    // Bass Synth
    bassSynth.current = new Tone.Synth().connect(dist);//toDestination();
    const bassNoteArr = updateNoteArray(state.instruments[1].grid, selectedScale, 2); 
    // console.log("MainContainer -> bassNoteArr", bassNoteArr)
    const bassSynthSeq = new Tone.Sequence( (time, note) => {
      bassSynth.current.triggerAttackRelease(note, "8n", time);
    }, bassNoteArr).start(0);
    return () => bassSynth.current.dispose();
  }, [state.instruments[1].grid, selectedScale])
  
  useEffect(() => {
    // Drum Synth
    drumSynth.current = new Tone.MembraneSynth().toDestination();
    // const drumNoteArr = updateNoteArray(drumTrack.grid, selectedScale);
    // const drumNoteArr = ['A-1', null, null, 'G-1', 'A-1', null, null, 'C-1'];
    const drumNoteArr = ['A-1', null, null, null, 'A-1', null, null, null];
    const drumSynthSeq = new Tone.Sequence((time, note) => {
      drumSynth.current.triggerAttackRelease(note, "8n", time);
    }, drumNoteArr).start(0);
    return () => drumSynth.current.dispose();
  }, [state.instruments[0].grid, selectedScale])

    // Sampler
    // sampler.current = new Tone.Sampler({testSample}, {
    //   onload: () => { setLoaded(true); }
    // }).toMaster();

  // console.log("state.instruments: ", state.instruments);
  // const { instrumentSelected } = state.users[state.local.localUserId];

  return (
    <div className="MainContainer">
      {/* <button disabled={!isLoaded} onClick={handleClick}>Trigger Sample</button> */}
      <div id="time"></div>
      <div id="seconds"></div>
      {/* <button onClick={playPause}>TOGGLE SICK BEATS</button> */}

      {/* ***TEST BUTTONS*** */}
      {/* extra comment */}
      {/* <button onClick={() => dispatch({
        type: reducerConstants.TOGGLE_GRID_BUTTON, 
        payload: { x: 5, y: 3}
        })}>
        DISPATCH SICK PAYLOAD (grid button 5,3)
      </button>
      <button onClick={() => dispatch({
        type: reducerConstants.TOGGLE_IS_PLAYING, 
        payload: { x: 5, y: 3}
        })}>
        SICK PLAY/PAUSE BUTTON
      </button>
      <button onClick={() => dispatch({
        type: reducerConstants.TOGGLE_IS_PLAYING, 
        payload: initialState2
        })}>
        SICK SET STATE2 BUTTON
      </button>
      <button onClick={() => dispatch({
        type: reducerConstants.TOGGLE_IS_PLAYING, 
        payload: initialState3
        })}>
        SICK SET STATE3 BUTTON
      </button>
      <button onClick={() => dispatch({
        type: reducerConstants.ADD_USER, 
        payload: {'aaa111': { userName: 'tom', instrumentSelected: 0, color: 'red'}},

        })}>
        SICK NEW USER BUTTON
      </button>
      <button onClick={() => dispatch({
        type: reducerConstants.REMOVE_USER, 
        payload: 'aaa111',

        })}>
        SICK REMOVE USER BUTTON
      </button>
      <button onClick={() => {
        socket.emit('updateServerState', state)
      }}>
        SICK UPDATE SOCKET BUTTON
      </button>
 */}


      <HeaderContainer />
      <VisualContainer 
        numRows={15} 
        numColumns={16} 
        curStepColNum={step}
        // gridState={state.instruments[instrumentSelected].grid}
        gridState={state.instruments[1].grid}
        dispatch={dispatch}
        instruments={state.instruments}
        scales={scales}
        selectedScale={state.local.localScale}
        />
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
