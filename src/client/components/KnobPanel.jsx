/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
// import { Dial } from 'react-nexusui';
import Dial from './Knob';

const Knobs = React.memo(({
  k1Val, k2Val, k3Val, k4Val,
  handleK1Change, handleK2Change, handleK3Change, handleK4Change,
}) => (
  <KnobPanelWrapper>
    <DialWrapper>
      <Dial
        size={[45, 45]}
        interaction="vertical"
        mode="absolute"
        min={-36}
        max={0}
        step={1}
        value={k1Val}
        onChange={handleK1Change}
      />
    </DialWrapper>
    <DialWrapper alignRight>
      <Dial
        size={[45, 45]}
        interaction="vertical"
        mode="absolute"
        min={0}
        max={1}
        step={0.5}
        value={k2Val}
        onChange={handleK2Change}
      />
    </DialWrapper>
    <DialWrapper>
      <Dial
        size={[45, 45]}
        interaction="vertical"
        mode="absolute"
        min={0}
        max={1}
        step={0.5}
        value={k3Val}
        onChange={handleK3Change}
      />
    </DialWrapper>
    <DialWrapper alignRight>
      <Dial
        size={[45, 45]}
        interaction="vertical"
        mode="absolute"
        min={0}
        max={1}
        step={0.5}
        value={k4Val}
        onChange={handleK4Change}
      />
    </DialWrapper>
  </KnobPanelWrapper>
));

const KnobPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0 24px 24px;
  border-left: 1px solid #444444;
  border-right: 1px solid #444444;
  border-bottom: 1px solid #444444;
`;

const DialWrapper = styled.div`
  margin: ${(props) => (props.alignRight ? '0px 0px 0px 40px' : '0px 0px 0px 0px')};
`;

export default Knobs;
