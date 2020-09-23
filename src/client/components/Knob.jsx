/* eslint-disable react/prop-types */
import React, { useEffect, useRef, memo } from 'react';
import * as Nexus from 'nexusui';

let id = 0;
function getId() {
  id += 1;
  return id;
}

function NO_OP() {}

const Dial = memo(({
  size,
  interaction,
  max,
  min,
  mode,
  value,
  onChange = NO_OP,
  onReady = NO_OP,
}) => {
  const dial = useRef(null);
  const elementId = useRef(`nexus-ui-dial-${getId()}`);

  useEffect(() => {
    dial.current = new Nexus.Dial(elementId.current, {
      size,
      interaction,
      max,
      min,
      mode,
    });
    onReady(dial.current);
    dial.current.colorize('accent', '#c9f9ff');
    dial.current.colorize('fill', '#333');
    dial.current.on('change', (newState) => {
      onChange(newState);
    });
    return () => {
      dial.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (dial.current === null) return;
    if (!Array.isArray(size)) {
      return;
    }
    dial.current.resize(...size);
  }, [size]);

  useEffect(() => {
    if (dial.current === null) return;
    if (value === undefined) return;

    dial.current.value = value;
  }, [value]);

  useEffect(() => {
    if (dial.current === null) return;
    if (min === undefined) return;
    dial.current.min = min;
  }, [min]);

  useEffect(() => {
    if (dial.current === null) return;
    if (max === undefined) return;
    dial.current.max = max;
  }, [max]);

  useEffect(() => {
    if (dial.current === null) return;
    if (interaction === undefined) return;
    dial.current.interaction = interaction;
  }, [interaction]);
  return <div key={elementId.current} id={elementId.current} />;
});

export default Dial;
