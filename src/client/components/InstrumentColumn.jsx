/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import * as reducerConstants from '../reducer/reducerConstants';

const InstrumentColumn = React.memo(({
  instruments, dispatch, localUserId, selectedInstr,
}) => (
  <div className="InstrumentColumn">
    <ul>
      {
        instruments
          ? instruments.map((item, i) => (
            <div key={instruments[i].name}>
              <button
                type="button"
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

InstrumentColumn.propTypes = {
  instruments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    soundPreset: PropTypes.string,
    mono: PropTypes.bool,
    legato: PropTypes.bool,
    grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  selectedInstr: PropTypes.number.isRequired,
};

export default InstrumentColumn;
