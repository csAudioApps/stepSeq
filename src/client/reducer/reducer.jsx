import { TOGGLE_GRID_BUTTON } from "./reducerConstants";
// dispatch({ type: TOGGLE_GRID_BUTTON, payload: { 
//   x: 4,
//   y: 3
// }})
export const reducer = (state, action) => {
  console.log('reducing, state: ', state);
  console.log('reducing, action: ', action);
  switch (action.type) {
    case TOGGLE_GRID_BUTTON:
      // make copy of grid at user's selected instrument
      const { instrumentSelected } = state.users[state.local.localUserId];
      const newGrid = [...state.instruments[instrumentSelected].grid];

      // if value is included in grid, remove, else add it and sort array
      const currentColumn = newGrid[action.payload.x];
      const newColumn = currentColumn.includes(action.payload.y) ?
        currentColumn.filter(num => num !== action.payload.y) :
        currentColumn.concat(action.payload.y).sort((a, b) => a - b);

      // set column into new grid
      newGrid[action.payload.x] = newColumn;

      // set new grid into instrument list
      const newInstruments = [...state.instruments];
      newInstruments[instrumentSelected].grid = newGrid;

      // return state with new intrument list
      return {
        ...state,
        instruments: newInstruments
      };

    // case UPDATE_STATUS:
    //   return {
    //     ...state,
    //     status: {
    //       ...state.status,
    //     }
    //   }
    // toggle playback
    // trigger helper pause, return updated state
    default:
      throw new Error('Error: invalid reducer action type');
  }
};
