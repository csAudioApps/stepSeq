import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MainContainer from '../containers/MainContainer';

const App = (props) => {
  // let socket = io('http://localhost:3000');
  let socket;
  useEffect(() => {
    socket = io('http://localhost:3000');
    socket.on('sendMessage', (msg) => {
      console.log(msg);
    });
  });

  const [inputText, setInputText] = useState('');
  console.log('react is rendering');
  const send = () => {
    console.log(socket);
    console.log('sending text ', inputText);
    socket.emit('sendMessage', inputText);
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
