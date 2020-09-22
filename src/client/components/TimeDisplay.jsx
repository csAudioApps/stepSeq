import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const TimeDisplay = ({ position }) => (
  <li>
    <StyledTimeDisplay className="time-display">{position}</StyledTimeDisplay>
  </li>
);

export default TimeDisplay;

// TimeDisplay.propTypes = {
//   position: PropTypes.string,
// };

const StyledTimeDisplay = styled.div`
  font-family: inherit;
  padding: 5px;
  float: right
`;
