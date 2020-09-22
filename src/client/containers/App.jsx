import React, { useState } from 'react';
import MainContainer from './MainContainer';
import GlobalStyle from '../styles/globalStyles';
import { socket } from '../helpers/socket';
import ImagePath from '../assets/night-sky.jpg';

const App = () => {
  const [inputText] = useState('');
  const send = () => {
    console.log('sending text ', inputText);
    socket.emit('updateServerState', inputText);
  };

  return (
    <>
      <GlobalStyle img={ImagePath} />
      <MainContainer />
    </>
  );
};

export default App;
