/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { func, string } from 'prop-types';
import DOMPurify from 'dompurify';
import useKeypress from '../hooks/useKeypress';
import useOnClickOutside from '../hooks/useOnClickOutside';

const InlineEdit = ({ text, onSetText }) => {
  console.log('InlineEdit -> text', text);
  console.log('InlineEdit -> onSetText', onSetText);
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef(null);

  const enter = useKeypress('Enter');
  const esc = useKeypress('Escape');

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    console.log('OUTSIDE CLICK');
    if (isInputActive) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  const onEnter = useCallback(() => {
    console.log('ENTER');
    if (enter) {
      onSetText(inputValue);
      setIsInputActive(false);
    }
  }, [enter, inputValue, onSetText]);

  const onEsc = useCallback(() => {
    console.log('ESCAPE');
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
      console.log('InlineEdit -> sanitizedText', sanitizedText);

      setInputValue(sanitizedText);
    },
    [setInputValue],
  );

  const handleSpanClick = useCallback(() => setIsInputActive(true), [
    setIsInputActive,
  ]);

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={handleSpanClick}
        className={`inline-text_copy inline-text_copy--${
          !isInputActive ? 'active' : 'hidden'
        }`}
      >
        {text}
      </span>
      <input
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        // style={{ width: '8ch' }}
        value={inputValue}
        onChange={handleInputChange}
        className={`inline-text_input inline-text_input--${
          isInputActive ? 'active' : 'hidden'
        }`}
      />
    </span>
  );
};

export default InlineEdit;

InlineEdit.propTypes = {
  text: string.isRequired,
  onSetText: func.isRequired,
};
