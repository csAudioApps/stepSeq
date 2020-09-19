/* eslint-disable object-curly-newline */
/* eslint-disable no-multi-spaces */
/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';
import * as Tone from 'tone';
import HeaderContainer from './HeaderContainer';
import ControlBar from '../components/ControlBar';
import InstrumentColumn from '../components/InstrumentColumn';
import Board from '../components/Board';
import Knobs from '../components/Knobs';
import Footer from '../components/Footer';
import { updateNoteArray, toggleToneTransport } from '../helpers/audioHelpers';
import { mainInitState, userInitState } from '../constants/initState';
import reducer from '../reducer/reducer';
import * as types from '../reducer/reducerConstants';
import { socket } from '../helpers/socket';
// import uuid from "uuid";

// const seqLen = 16;

const MainContainer = () => {
  const [state, dispatch] = useReducer(reducer, mainInitState);
  const [step, setStep] = useState(0);
  // const [position, setPosition] = useState('0:0:0');

  const { users, local, instruments } = state;
  const { localUserId } = local;
  const selectedScale = (users[localUserId]) ? users[localUserId].selectedScale : 0;
  const selectedInstr = (users[localUserId]) ? users[localUserId].instrumentSelected : 1;
  const gridForCurInstr = (users[localUserId]) ? instruments[selectedInstr].grid : [[]];
  const isPlaying = (users[localUserId]) ? users[localUserId].isPlaying : false;

  const transport = useRef(null);
  const bassSynth = useRef(null);
  const drumSynth = useRef(null);
  let dly;
  let dist;

  // open socket connection
  useEffect(() => {
    // get initial state
    console.log('socket: ', socket);
    socket.emit('getInitialState');
    socket.on('updateClientState', (msg, senderId) => {
      if (socket.id !== senderId) {
        dispatch({ type: types.SET_STATE_FROM_SOCKET, payload: msg });
      }
      else {
        // console.log('they are equal')
      }
    });
    return () => socket.disconnect();
  }, []);

  // Add User
  useEffect(() => {
    if (!Object.keys(users).includes(localUserId)) {
      dispatch({ type: types.ADD_USER, payload: { [localUserId]: userInitState } });
    }
  }, [users, localUserId]);

  // Initial (one-time) Tone and Tranpost Setup
  useEffect(() => {
    // console.log('A');
    Tone.Context.latencyHint = 'playback';
    Tone.Transport.bpm.value = state.status.tempo ? state.status.tempo : 120;
    transport.current = new Tone.Sequence((time, curStep) => {
      setStep(curStep);
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '8n').start(0);

    // dly = new Tone.FeedbackDelay('8n', 0.5).toDestination();
    // dist = new Tone.Distortion(0.4).connect(dly);
    dist = new Tone.Distortion(0.4).toDestination();
    bassSynth.current = new Tone.Synth().connect(dist);
    // bassSynth.current = new Tone.Synth().toDestination();
    drumSynth.current = new Tone.MembraneSynth().toDestination();
    // console.log('B');

    // clean up side effects
    return () => {
      transport.current.dispose();
      drumSynth.current.dispose();
      bassSynth.current.dispose();
      dly.dispose();
      dist.dispose();
    };
  }, []);

  // PRETTY SURE THIS IS WRONG WAY TO DO THIS, but trying to update delay tempo on tempo change
  useEffect(() => {
    console.log('in useEffect delay update');
    dly = new Tone.FeedbackDelay('8n', 0.5).toDestination();
  }, [dly, state.status.tempo]);

  // Bass Sequence
  useEffect(() => {
    // console.log('C');
    if (bassSynth && bassSynth.current) {
      const bassNoteArr = updateNoteArray(instruments[1].grid, selectedScale, 2);
      console.log('MainContainer -> bassNoteArr', bassNoteArr);
      const bassSynthSeq = new Tone.Sequence((time, note) => {
        bassSynth.current.triggerAttackRelease(note, '8n', time);
      }, bassNoteArr).start(0);

      // clean up side effects
      return () => bassSynthSeq.dispose();
    }
    return null;
  }, [instruments, selectedScale]);

  // Drum Sequence
  useEffect(() => {
    // console.log('D');
    if (drumSynth && drumSynth.current) {
      const drumNoteArr = updateNoteArray(instruments[0].grid, selectedScale, 0);
      const drumSynthSeq = new Tone.Sequence((time, note) => {
        drumSynth.current.triggerAttackRelease(note, '8n', time);
      }, drumNoteArr).start(0);

      // clean up side effects
      return () => drumSynthSeq.dispose();
    }
    return null;
  }, [instruments, selectedScale]);

  const handleUserKeyPress = useCallback((event) => {
    const { code, altKey } = event;
    switch (code) {
      case 'Space': {
        if (toggleToneTransport()) {
          dispatch({ type: types.TOGGLE_PLAY_STATE, payload: { localUserId } });
        }
        break;
      }
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
      case 'Digit6':
      case 'Digit7':
      case 'Digit8':
      case 'Digit9':
      case 'Digit0': {
        const lastDigit = Number(code[code.length - 1]);
        const selectedIndex = lastDigit === 0 ? 10 : lastDigit - 1;
        if (altKey === true) {    // Numbers + alt key change scale
          dispatch({
            type: types.SET_SELECTED_SCALE,
            payload: { localUserId, selectedScale: selectedIndex },
          });
        }
        else {                    // Numbers alone change instrument
          dispatch({
            type: types.SET_SELECTED_INSTRUMENT,
            payload: { localUserId, instrumentSelected: selectedIndex },
          });
        }
        break;
      }
      default:
        break;
    }
  }, [localUserId]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => { window.removeEventListener('keydown', handleUserKeyPress); };
  }, [handleUserKeyPress]);

  return (
    <div className="MainContainer">
      <div id="time" />
      <div id="seconds" />
      <HeaderContainer />
      <div className="body">
        <div className="VisualContainer">
          <ControlBar
            localUserId={localUserId}
            selectedScale={selectedScale}
            dispatch={dispatch}
            isPlaying={isPlaying}
            curTempo={state.status.tempo}
          />
          <div className="row">
            <div className="column">
              <InstrumentColumn
                instruments={instruments}
                localUserId={localUserId}
                selectedInstr={selectedInstr}
                dispatch={dispatch}
              />
              <Knobs />
            </div>
            <Board
              numRows={15}
              numColumns={16}
              curStepColNum={step}
              gridState={gridForCurInstr}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainContainer;

// if we are first user, create state in the server
// socket.on('firstUser', () => {
//   console.log('first')
//   socket.emit('updateServerState', state, socket.id);
// })
// when we receive and updated state from server, update local state
// only update if update was sent fron another user

// Update Transport Position Display
// useEffect(() => {
//   const id = Tone.Transport.scheduleRepeat(() =>  {
//     const curPosition = Tone.Transport.position.toString().split('.')[0];
//     console.log('Updating position -> curPosition', curPosition);
//     setPosition(curPosition);
//   }, '8n');

//   return () => { Tone.Transport.clear(id); };
// }, []);
