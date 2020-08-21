import * as reducerConstants from './reducerConstants';
import { socket } from '../helpers/socket';
import scales from '../constants/scales';

const reducer = (state, action) => {
  // console.log('reducing, state: ', state);
  // console.log('reducing, action: ', action);
  let newState;
  let instrumentSelected;
  console.log('action.type: ', action.type);
  switch (action.type) {
    case reducerConstants.SET_LOCAL_USERID: {
      return {
        ...state,
        local: {
          ...state.local,
          localUserId: action.payload,
        },
      };
    }
    //
    case reducerConstants.SET_NEW_USER: {
      return {
        ...state,
      };
    }
    // payload = state object
    case reducerConstants.SET_STATE_FROM_SOCKET: {
      return {
        ...action.payload,
        local: state.local,
      };
    }
    // payload = user object {string: {username, instrument...}}
    case reducerConstants.ADD_USER: {
      newState = {
        ...state,
        users: {
          ...state.users,
          ...action.payload,
        },
        local: {
          ...state.local,
          localUserId: Object.keys(action.payload)[0],
        },
      };
      socket.emit('updateServerState', newState, socket.id);
      return newState;
    }
    // payload = userId: string
    case reducerConstants.REMOVE_USER: {
      const newUsers = { ...state.users };
      delete newUsers[action.payload];

      return {
        ...state,
        users: newUsers,
      };
    }
    // payoad: object with x and y coordinates of grid button: {x: number, y: number}
    case reducerConstants.TOGGLE_GRID_BUTTON: {
      // make copy of grid at user's selected instrument
      instrumentSelected = state.users[state.local.localUserId].instrumentSelected;
      const newGrid = [...state.instruments[instrumentSelected].grid];

      // if value is included in grid, remove, else add it and sort array
      const currentColumn = newGrid[action.payload.x];
      const newColumn = currentColumn.includes(action.payload.y)
        ? currentColumn.filter((num) => num !== action.payload.y)
        : currentColumn.concat(action.payload.y).sort((a, b) => a - b);

      // set column into new grid
      newGrid[action.payload.x] = newColumn;

      // set new grid into instrument list
      const newInstruments = [...state.instruments];
      newInstruments[instrumentSelected].grid = newGrid;

      // return state with new intrument list
      newState = {
        ...state,
        instruments: newInstruments,
      };
      socket.emit('updateServerState', newState, socket.id);
      return newState;
    }

    case reducerConstants.TOGGLE_IS_PLAYING: {
      newState = {
        ...state,
        users: {
          ...state.users,
          [action.payload.localUserId]: {
            ...state.users[action.payload.localUserId],
            isPlaying: !isPlaying,
          },
        },
      };
      // users: {
      //           ...state.users,
      //           [action.payload.localUserId]: {
      //           isPlaying: !state.status.isPlaying,
      //         },
      //       };
      socket.emit('updateServerState', newState, socket.id);
      return newState;
    }
    case reducerConstants.SET_SELECTED_INSTRUMENT: {
      let numSelected = action.payload.instrumentSelected;
      if (numSelected < state.instruments.length) {
        numSelected = action.payload.instrumentSelected;
      }
      else {
        return state;
      }

      newState = {
        ...state,
        users: {
          ...state.users,
          [action.payload.localUserId]: {
            ...state.users[action.payload.localUserId],
            instrumentSelected: numSelected,
          },
        },
      };
      socket.emit('updateServerState', newState, socket.id);
      return newState;
    }
    case reducerConstants.SET_SELECTED_SCALE: {
      console.log('in reducer->set selected scale');
      console.log(action.payload);
      let numSelected = action.payload.selectedScale;
      if (numSelected < scales.length) {
        numSelected = action.payload.selectedScale;
      }
      else {
        return state;
      }

      newState = {
        ...state,
        users: {
          ...state.users,
          [action.payload.localUserId]: {
            ...state.users[action.payload.localUserId],
            selectedScale: action.payload.selectedScale,
          },
        },
      };
      console.log('reducer -> set selected scale', newState);

      // TODO This is gonna break - other users need to know what scale you're using
      return newState;
    }

    // not working yet
    // case UPDATE_STATUS:
    //   return {
    //     ...state,
    //     status: {
    //       ...state.status,
    //     }
    //   }
    // toggle playback
    // trigger helper pause, return updated state
    default: {
      throw new Error('Error: invalid reducer action type');
    }
  }
};

export default reducer;
