import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const App = (props) => {
  let socket = io('http://localhost:3000');
  // useEffect(() => {
  //   socket = io('http://localhost:3000');
  // }, []);

  const [inputText, setInputText] = useState('');

  const send = () => {
    console.log('sending text ', inputText);
    socket.emit('sendMessage');
  };
  return (
    <div>
      Piss off, I'm full
      <input onChange={(e) => setInputText(e.target.value)} type="text" />
      <button onClick={() => send()}>send</button>
    </div>
  );
};

export default App;
