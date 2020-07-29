import React from 'react';
import GridButton from './GridButton';

const Board = ({numRows, numColumns, curStepColNum, gridState, dispatch}) => {

  const renderButtons = () => {
    let grid = [];
    
    for(let y = numRows-1; y >= 0; y--){
      let buttonRow = [];

      for(let x = 0; x < numColumns; x++) {
        buttonRow.push(<td key={x.toString() + '-' + y.toString()}>
          <GridButton x={x} y={y}
            key={x.toString() + '-' + y.toString()}
            curStepColNum={curStepColNum}
            dispatch={dispatch}
            gridState={gridState}        
          />
          </td>)
      }
      grid.push(<tr className={y%7===0 ? 'btn-row-root' : 'btn-row'} 
                  key={y.toString()}>{buttonRow}
                </tr>)
    }
    // console.log("renderButtons -> grid", grid)
    return grid;
  }

  return (
    <div className="Board">
      <table>
        <tbody>
          {renderButtons()}
        </tbody>
      </table>
    </div>
  )
}

export default Board;