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
  margin: auto 0.4em;
  padding: 5px;
  float: left;
`;

const ScaleOption = styled.button`
  margin: 0.4em;
  float: left;
  background: transparent;
  font-weight: ${(props) => (props.isSelected ? 700 : 200)};
`;
