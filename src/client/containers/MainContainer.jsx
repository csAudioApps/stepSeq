import React, {useState, useEffect, useRef, useReducer} from 'react';
import VisualContainer from './VisualContainer';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';
import * as Tone from "tone";
import {scales} from '../constants/scales.js'
import {updateNoteArray} from '../helpers/audioHelpers.js';
import { initialState } from '../constants/initBoardState'
import { reducer } from '../reducer/reducer';
import * as reducerConstants from '../reducer/reducerConstants'
import { socket } from '../helpers/socket';
// import uuid from "uuid";

// ***** PULL FROM STATE *****
// const seqLen = 16;
Tone.Transport.bpm.value = 120;
let selectedScale = 0;

const MainContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);  
  const [isLoaded, setLoaded] = useState(false);
  const transport = useRef(null);
  const bassSynth = useRef(null);
  const drumSynth = useRef(null);
  const [step, setStep] = useState(0);
  let dly;
  let dist;

  selectedScale = state.users && state.local && state.users[state.local.localUserId]
    ? state.users[state.local.localUserId].selectedScale
    : 0;
  
  // is this a clear var name?
  let gridNumber = state.users[state.local.localUserId] 
    ? state.instruments[state.users[state.local.localUserId].instrumentSelected].grid
    : 1

  let selectedInstr = state.users[state.local.localUserId] 
    ? state.users[state.local.localUserId].instrumentSelected
    : 1;

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
    
    return () => socket.disconnect();
  }, []);
  
  useEffect(() => {
    if (!Object.keys(state.users).includes(state.local.localUserId)) {
      const id = state.local.localUserId;
      dispatch({
        type: reducerConstants.ADD_USER, 
        payload: {
          [id]: { userName: '', instrumentSelected: 1, selectedScale: 0, color: 'red' }
        }
      })
    }
  }, [state.users, state.local.localUserId])

  // Transport and Setup
  useEffect(() => {
    console.log("A");
    Tone.Context.latencyHint = 'playback'
    transport.current = new Tone.Sequence((time, step) => {
      setStep(step);
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "8n").start(0);
    
    dly = new Tone.FeedbackDelay("8n", 0.5).toDestination();
    dist = new Tone.Distortion(0.4).connect(dly);
    bassSynth.current = new Tone.Synth().connect(dist);
    drumSynth.current = new Tone.MembraneSynth().toDestination();
    console.log("B");

    // clean up side effects
    return () => {
      transport.current.dispose();
      dly.dispose();
      dist.dispose();
      drumSynth.current.dispose();
      bassSynth.current.dispose();
    }
  }, []);
  
  // Bass Synth
  useEffect(() => {
    console.log("C");
    if(bassSynth && bassSynth.current) {
      const bassNoteArr = updateNoteArray(state.instruments[1].grid, selectedScale, 2); 
      console.log("MainContainer -> bassNoteArr", bassNoteArr)
      const bassSynthSeq = new Tone.Sequence( (time, note) => {
        bassSynth.current.triggerAttackRelease(note, "8n", time);
      }, bassNoteArr).start(0);

      // clean up side effects
      return () => bassSynthSeq.dispose();
    }
  }, [state.instruments[1].grid, selectedScale])
  
  // Drum Synth
  useEffect(() => {
    console.log("D");
    if(drumSynth && drumSynth.current) {  
      // const drumNoteArr = ['A-1', null, null, null, 'A-1', null, null, null];
      const drumNoteArr = updateNoteArray(state.instruments[0].grid, selectedScale, 0); ;
      const drumSynthSeq = new Tone.Sequence((time, note) => {
        drumSynth.current.triggerAttackRelease(note, "8n", time);
      }, drumNoteArr).start(0);

      // clean up side effects
      return () => drumSynthSeq.dispose();
    }
  }, [state.instruments[0].grid, selectedScale])

  // console.log("MainContainer -> selectedScale", selectedScale)

  return (
    <div className="MainContainer">
      <div id="time"></div>
      <div id="seconds"></div>
      <HeaderContainer />
      <VisualContainer 
        numRows={15} 
        numColumns={16} 
        curStepColNum={step}
        gridState={gridNumber}
        dispatch={dispatch}
        instruments={state.instruments}
        selectedInstr={selectedInstr}
        scales={scales}
        selectedScale={selectedScale}
        localUserId={state.local.localUserId}
        />
      <Footer />
    </div>
  )
}

export default MainContainer;








// const drumTrack = { 
//   name: "Drums", soundPreset: "BasicDrumset", mono: null, legato: false, grid:
//     // [ [3], [3], [4], [], [0], [], [], [], [], [2], [], [0], [], [0], [1], [2] ] 
//     [ [4], [], [], [], [4], [], [], [], [4], [], [], [], [4], [], [], [] ] 
// };

// const bassTrack = { 
// name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: 
//   [ [14], [4], [4], [13], [0], [14], [7], [], [0], [2], [7], [0], [7], [0], [1], [] ] 
//   // [ [14], [3], [4], [13], [0], [14], [], [], [], [0], [], [0], [7], [0], [1], [] ] 
// };
// ***************************



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


    // Sampler
    // sampler.current = new Tone.Sampler({testSample}, {
    //   onload: () => { setLoaded(true); }
    // }).toMaster();

  // console.log("state.instruments: ", state.instruments);
  // const { instrumentSelected } = state.users[state.local.localUserId];