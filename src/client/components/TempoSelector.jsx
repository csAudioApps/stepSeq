import React from 'react';
import { number, func } from 'prop-types';
import styled from 'styled-components';
import InlineEdit from './InlineEdit';
import { SET_TEMPO } from '../reducer/reducerConstants';

const TempoSelector = ({ dispatch, curTempo }) => (
  <>
    <TempoTitle>Tempo</TempoTitle>
    <InlineEdit
      text={curTempo.toString()}
      onSetText={(newText) => {
        let newTempo = Number(newText);
        // Make sure it's a valid number, otherwise keep current tempo
        newTempo = Number.isNaN(newTempo) ? curTempo : newTempo;
        dispatch({ type: SET_TEMPO, payload: { newTempo } });
      }}
    />
  </>
);

TempoSelector.propTypes = {
  dispatch: func.isRequired,
  curTempo: number.isRequired,
};

const TempoTitle = styled.li`
  margin: auto 0.4em auto auto;
`;

export default TempoSelector;
