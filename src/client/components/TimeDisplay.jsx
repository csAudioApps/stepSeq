import React from 'react';
import PropTypes from 'prop-types';

export const TimeDisplay = ({ position }) => (
  <li>
    <div className="time-display">{position}</div>
  </li>
);

export default TimeDisplay;

// TimeDisplay.propTypes = {
//   position: PropTypes.string,
// };
