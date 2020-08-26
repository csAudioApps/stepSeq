/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import scales from '../constants/scales';
import { SET_SELECTED_SCALE } from '../reducer/reducerConstants';

const ScaleSelector = React.memo(({ dispatch, localUserId, selectedScale }) => (
  <>
    <li className="scales">Scale</li>
    {
        scales
          ? scales.map((item, scaleIndex) => (
            <li
              className={selectedScale === scaleIndex ? 'scale-btn-selected' : 'scale-btn'}
              onClick={() => dispatch({
                type: SET_SELECTED_SCALE,
                payload: { localUserId, selectedScale: scaleIndex },
              })}
              key={`scaleBtn${scaleIndex.toString()}`}
            >
              {scaleIndex + 1}
            </li>
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
