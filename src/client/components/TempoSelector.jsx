import React from 'react';
import { number, func } from 'prop-types';
// import * as Tone from 'tone';
import InlineEdit from './InlineEdit';
import { SET_TEMPO } from '../reducer/reducerConstants';

const TempoSelector = ({ dispatch, curTempo }) => (
  <li>
    <div className="tempo-selector">
      Tempo
      {' '}
      <InlineEdit
        text={curTempo}
        onSetText={(newText) => dispatch({
          type: SET_TEMPO,
          payload: { newTempo: newText },
        })}
      />
    </div>
  </li>
);

TempoSelector.propTypes = {
  dispatch: func.isRequired,
  curTempo: number.isRequired,
};

export default TempoSelector;
