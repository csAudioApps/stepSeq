/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TOGGLE_GRID_BUTTON } from '../reducer/reducerConstants';

const GridButton = ({
  x, y, curStepColNum, dispatch, gridState,
}) => {
  // console.log("GridButton -> gridState", gridState)

  let isBtnOn = false;
  let className;

  if (gridState[x] && Array.isArray(gridState[x])) {
    gridState[x].forEach((elem) => {
      if (elem === y) {
        isBtnOn = true;
        // break;
      }
    });
  }

  if (curStepColNum === x) {
    className = isBtnOn
      ? 'grid-btn grid-btn-on-and-cur-step'
      : 'grid-btn grid-btn-off-and-cur-step';
  }
  else {
    className = isBtnOn
      ? 'grid-btn grid-btn-on'
      : 'grid-btn grid-btn-off';
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => dispatch({
        type: TOGGLE_GRID_BUTTON,
        payload: { x, y },
      })}
    />
  );
};

export default GridButton;
