import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Dial } from 'react-nexusui';

const Knobs = React.memo(() => {
  const [k1Val, setk1Val] = useState(0);
  const [k2Val, setk2Val] = useState(0);
  const [k3Val, setk3Val] = useState(0);
  const [k4Val, setk4Val] = useState(0);

  const handleK1Change = useCallback(((val) => {
    setk1Val(val);
  }), []);

  const handleK2Change = useCallback(((val) => {
    setk2Val(val);
  }), []);

  const handleK3Change = useCallback(((val) => {
    setk3Val(val);
  }), []);

  const handleK4Change = useCallback(((val) => {
    setk4Val(val);
  }), []);

  return (
    <KnobPanelWrapper>
      <DialWrapper>
        <Dial
          size={[40, 40]}
          interaction="vertical"
          mode="absolute"
          min={0}
          max={100}
          step={1}
          value={k1Val}
          onChange={handleK1Change}
        />
      </DialWrapper>
      <DialWrapper alignRight>
        <Dial
          size={[40, 40]}
          interaction="vertical"
          mode="absolute"
          min={0}
          max={100}
          step={1}
          value={k2Val}
          onChange={handleK2Change}
        />
      </DialWrapper>
      <DialWrapper>
        <Dial
          size={[40, 40]}
          interaction="vertical"
          mode="absolute"
          min={0}
          max={100}
          step={1}
          value={k3Val}
          onChange={handleK3Change}
        />
      </DialWrapper>
      <DialWrapper alignRight>
        <Dial
          size={[40, 40]}
          interaction="vertical"
          mode="absolute"
          min={0}
          max={100}
          step={1}
          value={k4Val}
          onChange={handleK4Change}
        />
      </DialWrapper>
    </KnobPanelWrapper>
  );
});

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
