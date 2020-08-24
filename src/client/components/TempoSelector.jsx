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
        text={curTempo.toString()}
        onSetText={(newText) => {
          let newTempo = Number(newText);
          // Make sure it's a valid number, otherwise keep current tempo
          newTempo = Number.isNaN(newTempo) ? curTempo : newTempo;
          dispatch({ type: SET_TEMPO, payload: { newTempo } });
        }}
      />
    </div>
  </li>
);

TempoSelector.propTypes = {
  dispatch: func.isRequired,
  curTempo: number.isRequired,
};

export default TempoSelector;
