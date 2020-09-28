/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import scales from '../constants/scales';
import { SET_SELECTED_SCALE } from '../reducer/reducerConstants';

const ScaleSelector = React.memo(({ dispatch, localUserId, selectedScale }) => (
  <>
    <ScaleTitle>Scale</ScaleTitle>
    {
        scales
          ? scales.map((item, scaleIndex) => (
            <ScaleOption
              isSelected={selectedScale === scaleIndex}
              onClick={() => dispatch({
                type: SET_SELECTED_SCALE,
                payload: { localUserId, selectedScale: scaleIndex },
              })}
              key={`scaleBtn${scaleIndex.toString()}`}
            >
              {scaleIndex + 1}
            </ScaleOption>
          ))
          : <p>Loading...</p>
      }
  </>
));

ScaleSelector.propTypes = {
  dispatch: PropTypes.func.isRequired,
  localUserId: PropTypes.string.isRequired,
  selectedScale: PropTypes.number.isRequired,
};

export default ScaleSelector;

const ScaleTitle = styled.li`
  margin: auto 0.4em auto 20px;
  ${'' /* padding: 5px; */}
  font-size: 0.95em;
  float: left;
  color: #eaeaea;
`;

const ScaleOption = styled.button`
  color: #ababab;
  margin: 0.3em;
  float: left;
  font-size: 0.95em;
  background: transparent;
  font-weight: ${(props) => (props.isSelected ? 700 : 200)};
`;
