import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';

export const TempoSelector = () => (
  <li>
    <div className="tempo-selector">
      Tempo
      {' '}
      {Tone.Transport.bpm.value}
    </div>

  </li>
);

export default TempoSelector;

TempoSelector.propTypes = {

};
