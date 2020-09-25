/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import styled, { css } from 'styled-components';
import { TOGGLE_GRID_BUTTON } from '../reducer/reducerConstants';

const COLOR_DEFAULT = '#666666';
const COLOR_SELECTED = '#5dfdcb';
const COLOR_PLAYHEAD = '#c9f9ff';

const GridButton = ({
  x, y, curStepColNum, dispatch, gridState,
}) => {
  let isBtnOn = false;
  let buttonColor = '';

  if (gridState[x] && Array.isArray(gridState[x])) {
    gridState[x].forEach((elem) => {
      if (elem === y) {
        isBtnOn = true;
        // break;
      }
    });
  }

  if (curStepColNum === x) { buttonColor = COLOR_PLAYHEAD; }
  else { buttonColor = isBtnOn ? COLOR_SELECTED : COLOR_DEFAULT; }

  return (
    <StyledGridButton
      type="button"
      buttonColor={buttonColor}
      isCurrentStep={curStepColNum === x}
      onClick={() => dispatch({
        type: TOGGLE_GRID_BUTTON,
        payload: { x, y },
      })}
    />
  );
};

const StyledGridButton = styled.button`
  border: 0;
  margin: 1px;
  border-radius: 6px;
  width: 50px;
  height: 50px;
  float: left;
  background-color: ${(props) => (props.buttonColor)};
`;

export default GridButton;
