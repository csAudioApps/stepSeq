import React from 'react';
import GridButton from './GridButton';

const Board = ({numRows, numColumns, curStepColNum, gridState, toggleButtonState}) => {

  const renderButtons = () => {
    let grid = [];
    
    for(let y = numRows-1; y >= 0; y--){
      let buttonRow = [];

      for(let x = 0; x < numColumns; x++) {
        buttonRow.push(<td>
          <GridButton x={x} y={y}
            key={x.toString() + y.toString()}
            curStepColNum={curStepColNum}
            toggleButtonState={toggleButtonState}
            gridState={gridState}        
          />
          </td>)
      }
      grid.push(<tr>{buttonRow}</tr>)
    }
    console.log("renderButtons -> grid", grid)
    return grid;
  }

  return (
    <div className="Board">
      <table>
        {renderButtons()}
      </table>
    </div>
  )
}

export default Board;