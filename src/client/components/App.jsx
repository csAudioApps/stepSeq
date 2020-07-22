import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import MainContainer from '../containers/MainContainer';

const App = (props) => {
  // let socket = io('http://localhost:3000');
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io('http://localhost:3000');
    socket.current.on('sendMessage', (msg) => {
      console.log(msg);
    });
    return () => socket.current.disconnect();
  }, []);

  const [inputText, setInputText] = useState('');
  console.log('react is rendering');
  const send = () => {
    console.log(socket.current);
    console.log('sending text ', inputText);
    socket.current.emit('sendMessage', inputText);
  };

  return (
    <div>
      <MainContainer />
      Piss off, I'm full
      {/* <input onChange={(e) => setInputText(e.target.value)} type="text" /> */}
      <input onChange={(e) => setInputText(e.target.value)} type="text" />
      <button onClick={() => send()}>send</button>
    </div>
  );
};

export default App;
