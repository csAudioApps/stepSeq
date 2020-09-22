/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as reducerConstants from '../reducer/reducerConstants';

const InstrumentColumn = React.memo(({
  instruments, dispatch, localUserId, selectedInstr,
}) => (
  <InstrumentColumnWrapper>
    <ul>
      {
        instruments
          ? instruments.map((item, i) => (
            <div key={instruments[i].name}>
              <InstrumentButton
                type="button"
                isSelected={selectedInstr === i}
                key={instruments[i].name}
                onClick={() => dispatch({
                  type: reducerConstants.SET_SELECTED_INSTRUMENT,
                  payload: { localUserId, instrumentSelected: i },
                })}
              >
                {instruments[i].name}
              </InstrumentButton>
            </div>
          ))
          : <p>Loading...</p>
      }
    </ul>
  </InstrumentColumnWrapper>
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

const InstrumentColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 0px;
  min-width: 100px;
  flex-grow: 2;
  ${'' /* border: 1px solid grey; */}
  border-left: 1px solid #444444;
  border-right: 1px solid #444444;
  border-bottom: 1px solid #444444;
`;

const InstrumentButton = styled.button`
  cursor: pointer;
  margin: 12px;
  background-color: transparent;
  font-weight: ${(props) => (props.isSelected ? 700 : 200)};
`;

export default InstrumentColumn;
