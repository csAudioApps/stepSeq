import React from 'react';

const GridButton = ({x, y, curStepColNum, toggleButtonState, gridState}) => {

  let isBtnOn = false;
  let className;

  if(gridState[x] && Array.isArray(gridState[x])) {
    gridState[x].forEach(elem => {
      if(elem === y) {
        isBtnOn = true;
        // break;
      }
  })};

  if(curStepColNum === x) {
    isBtnOn 
      ? className = 'grid-btn grid-btn-on-and-cur-step' 
      : className = 'grid-btn grid-btn-off-and-cur-step';
  }
  else {
    isBtnOn 
      ? className = 'grid-btn grid-btn-on' 
      : className = 'grid-btn grid-btn-off';
  }

  return (
    <button className={className} onClick={toggleButtonState}></button>
  )
}

export default GridButton;