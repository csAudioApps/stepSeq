/* eslint-disable consistent-return */
import React, {
  useState, useEffect, useRef, useReducer, useCallback,
} from 'react';
import * as Tone from 'tone';
import VisualContainer from './VisualContainer';
import HeaderContainer from './HeaderContainer';
import Footer from '../components/Footer';
import scales from '../constants/scales';
import { updateNoteArray, togglePlayback } from '../helpers/audioHelpers';
import { initialState } from '../constants/initBoardState';
import reducer from '../reducer/reducer';
import * as reducerConstants from '../reducer/reducerConstants';
import { socket } from '../helpers/socket';
// import uuid from "uuid";

// ***** PULL FROM STATE *****
// const seqLen = 16;
Tone.Transport.bpm.value = 120;
// let selectedScale = 0;

const MainContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const transport = useRef(null);
  const bassSynth = useRef(null);
  const drumSynth = useRef(null);
  const [step, setStep] = useState(0);
  let dly;
  let dist;

  const selectedScale = state.users && state.local && state.users[state.local.localUserId]
    ? state.users[state.local.localUserId].selectedScale
    : 0;

  // is this a clear var name?
  const gridNumber = state.users[state.local.localUserId]
    ? state.instruments[state.users[state.local.localUserId].instrumentSelected].grid
    : 1;

  const selectedInstr = state.users[state.local.localUserId]
    ? state.users[state.local.localUserId].instrumentSelected
    : 1;

  // open socket connection
  useEffect(() => {
    // get initial state
    console.log('socket: ', socket);
    socket.emit('getInitialState');
    // if we are first user, create state in the server
    // socket.on('firstUser', () => {
    //   console.log('first')
    //   socket.emit('updateServerState', state, socket.id);
    // })
    // when we receive and updated state from server, update local state
    // only update if update was sent fron another user
    socket.on('updateClientState', (msg, senderId) => {
      if (socket.id !== senderId) {
        // console.log('***not equal****')
        dispatch({ type: reducerConstants.SET_STATE_FROM_SOCKET, payload: msg });
      }
      else {
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
          [id]: {
            userName: '', instrumentSelected: 1, selectedScale: 0, color: 'red', isPlaying: false,
          },
        },
      });
    }
  }, [state.users, state.local.localUserId]);

  // Transport and Setup
  useEffect(() => {
    console.log('A');
    Tone.Context.latencyHint = 'playback';
    transport.current = new Tone.Sequence((time, step) => {
      setStep(step);
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '8n').start(0);

    dly = new Tone.FeedbackDelay('8n', 0.5).toDestination();
    dist = new Tone.Distortion(0.4).connect(dly);
    bassSynth.current = new Tone.Synth().connect(dist);
    drumSynth.current = new Tone.MembraneSynth().toDestination();
    console.log('B');

    // clean up side effects
    return () => {
      transport.current.dispose();
      dly.dispose();
      dist.dispose();
      drumSynth.current.dispose();
      bassSynth.current.dispose();
    };
  }, []);

  // Bass Synth
  useEffect(() => {
    console.log('C');
    if (bassSynth && bassSynth.current) {
      const bassNoteArr = updateNoteArray(state.instruments[1].grid, selectedScale, 2);
      console.log('MainContainer -> bassNoteArr', bassNoteArr);
      const bassSynthSeq = new Tone.Sequence((time, note) => {
        bassSynth.current.triggerAttackRelease(note, '8n', time);
      }, bassNoteArr).start(0);

      // clean up side effects
      return () => bassSynthSeq.dispose();
    }
    return null;
  }, [state.instruments, selectedScale]);

  // Drum Synth
  useEffect(() => {
    console.log('D');
    if (drumSynth && drumSynth.current) {
      // const drumNoteArr = ['A-1', null, null, null, 'A-1', null, null, null];
      const drumNoteArr = updateNoteArray(state.instruments[0].grid, selectedScale, 0);
      const drumSynthSeq = new Tone.Sequence((time, note) => {
        drumSynth.current.triggerAttackRelease(note, '8n', time);
      }, drumNoteArr).start(0);

      // clean up side effects
      return () => drumSynthSeq.dispose();
    }
  }, [state.instruments]);

  const handleUserKeyPress = useCallback((event) => {
    const { code, altKey } = event;
    console.log('handleUserKeyPress -> code', code);

    // toggle playback
    switch (code) {
      case 'Space':
        // togglePlayback();
        dispatch({ 
          type: reducerConstants.TOGGLE_IS_PLAYING,
          payload: { localUserId: state.local.localUserId }
        });
        break;
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
        const selectedIndex = Number(code[code.length - 1]) - 1;
        console.log('handleUserKeyPress -> selectedIndex', selectedIndex);
        if (altKey === true) {
          console.log('in alt fuck; selectedIndex: ', selectedIndex);
          dispatch({
            type: reducerConstants.SET_SELECTED_SCALE,
            payload: { localUserId: state.local.localUserId, selectedScale: selectedIndex },
          });
        }
        // nums alone change instrument
        else {
          dispatch({
            type: reducerConstants.SET_SELECTED_INSTRUMENT,
            payload: { localUserId: state.local.localUserId, instrumentSelected: selectedIndex },
          });
        }
        break;
      }
      default:
        break;
    }
  }, [state.local.localUserId]);

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => { window.removeEventListener('keydown', handleUserKeyPress); };
  }, [handleUserKeyPress]);

  return (
    <div className="MainContainer">
      <div id="time" />
      <div id="seconds" />
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
  );
};

export default MainContainer;
