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
            <InstrumentItemWrapper>
              <InstrumentNumber>{i + 1}</InstrumentNumber>
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
              { selectedInstr === i ? <UserColorSwatch /> : null }
            </InstrumentItemWrapper>
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
  padding: 24px 20px 0 20px;
  width: 16em;
  flex-grow: 2;
  border-left: 1px solid #444444;
  border-right: 1px solid #444444;
  border-bottom: 1px solid #444444;
`;

const InstrumentItemWrapper = styled.div`
  display: flex;
`;

const InstrumentNumber = styled.span`
  color: grey;
  margin: auto 0.6em auto 0;
  font-size: 0.7em;
`;

const UserColorSwatch = styled.span`
  background-color: #5dfdcb;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  margin: auto 0;
  margin-left: auto;
`;

const InstrumentButton = styled.button`
  cursor: pointer;
  margin: 10px 0px;
  background-color: transparent;
  font-weight: 200;
  font-size: 0.85em;
  letter-spacing: 0.25em;
  color: #bbbbbb;
  ${'' /* font-weight: ${(props) => (props.isSelected ? 700 : 200)}; */}
`;

export default InstrumentColumn;
