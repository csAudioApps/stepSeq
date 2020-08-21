import React from 'react';
import * as reducerConstants from '../reducer/reducerConstants';

const InstrumentColumn = React.memo(({
  instruments, dispatch, localUserId, selectedInstr,
}) =>
  // console.log("InstrumentColumn -> instruments", instruments)
  (
    <div className="InstrumentColumn">
      <ul>
        {
        instruments
          ? instruments.map((item, i) => (
            <div key={i}>
              <button
                className={selectedInstr === i ? 'instr-btn-selected' : 'instr-btn'}
                key={instruments[i].name}
                onClick={() => dispatch({
                  type: reducerConstants.SET_SELECTED_INSTRUMENT,
                  payload: { localUserId, instrumentSelected: i },
                })}
              >
                {instruments[i].name}
              </button>
            </div>
          ))
          : <p>Loading...</p>
      }
      </ul>
    </div>
  ));

export default InstrumentColumn;
