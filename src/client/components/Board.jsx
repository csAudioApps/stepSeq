import React from 'react';
import styled from 'styled-components';
import GridButton from './GridButton';

const Board = ({
  numRows, numColumns, curStepColNum, gridState, dispatch,
}) => {
  const renderButtons = () => {
    const grid = [];

    for (let y = numRows - 1; y >= 0; y--) {
      const buttonRow = [];

      for (let x = 0; x < numColumns; x++) {
        buttonRow.push(
          <td key={`${x.toString()}-${y.toString()}`}>
            <GridButton
              x={x}
              y={y}
              key={`${x.toString()}-${y.toString()}`}
              curStepColNum={curStepColNum}
              dispatch={dispatch}
              gridState={gridState}
            />
          </td>,
        );
      }
      grid.push(
        <tr
          className={y % 7 === 0 ? 'btn-row-root' : 'btn-row'}
          key={y.toString()}
        >
          {buttonRow}
        </tr>,
      );
    }
    // console.log("renderButtons -> grid", grid)
    return grid;
  };

  return (
    <StyledBoard>
      <table>
        <tbody>
          {renderButtons()}
        </tbody>
      </table>
    </StyledBoard>
  );
};

const StyledBoard = styled.div`
  padding: 12px;
  ${'' /* border: 1px solid grey; */}
  border-bottom: 1px solid #444444;
  border-right: 1px solid #444444;
`;

export default Board;
