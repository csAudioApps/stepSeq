/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { func, string } from 'prop-types';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import useKeypress from '../hooks/useKeypress';
import useOnClickOutside from '../hooks/useOnClickOutside';

const InlineEdit = ({ text, onSetText }) => {
  // console.log('InlineEdit -> text', text);
  // console.log('InlineEdit -> onSetText', onSetText);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    // console.log('OUTSIDE CLICK');
    if (isInputActive) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    // console.log('ENTER');
    if (enter) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    // console.log('ESCAPE');
    if (esc) {
      setInputValue(text);
      setIsInputActive(false);
    }
  }, [esc, text]);

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter();
      // if Escape is pressed, revert the text and close the editor
      onEsc();
    }
  }, [onEnter, onEsc, isInputActive]); // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event) => {
      // sanitize the input a little
      const sanitizedText = DOMPurify.sanitize(event.target.value);
      // console.log('InlineEdit -> sanitizedText', sanitizedText);

      setInputValue(sanitizedText);
    },
    [setInputValue],
  );

  const handleSpanClick = useCallback(() => setIsInputActive(true), [
    setIsInputActive,
  ]);

  return (
    <StyledInlineEdit ref={wrapperRef}>
      <StyledInputInactive
        ref={textRef}
        onClick={handleSpanClick}
        isVisible={!isInputActive}
      >
        {text}
      </StyledInputInactive>
      <StyledActiveInput
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        isVisible={isInputActive}
      />
    </StyledInlineEdit>
  );
};

export default InlineEdit;

InlineEdit.propTypes = {
  text: string.isRequired,
  onSetText: func.isRequired,
};

const StyledInlineEdit = styled.span`
  background: #222222;
  padding: 0.3em;
  margin: auto 12px auto 0.1em;
  width: 2.7em;
`;

const StyledInputInactive = styled.span`
  display: ${(props) => (props.isVisible ? 'inline' : 'none')};
`;

const StyledActiveInput = styled.input`
  color: #bbbbbb;
  background: grey;
  width: 2.7em;
  text-align: inherit;
  letter-spacing: inherit;
  border: inherit;
  cursor: pointer;
  display: ${(props) => (props.isVisible ? 'inline' : 'none')};
`;
