import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
import MainContainer from '../containers/MainContainer';
import { socket } from '../helpers/socket'

const App = (props) => {
  // let socket = io('http://localhost:3000');
  // const socket = io('http://localhost:3000');
  useEffect(() => {
    console.log('**** use effect- connecting socket ****')
    // socket = io('http://localhost:3000');
    socket.on('updateClient', (msg) => {
      console.log(msg + 'client updated');
    });
    return () => socket.disconnect();
  }, []);

  const [inputText, setInputText] = useState('');
  const send = () => {
    console.log(socket);
    console.log('sending text ', inputText);
    socket.emit('updateServer', inputText);
  };

  return (
    <div>
      <MainContainer socket={socket}/>
      Piss off, I'm full
      {/* <input onChange={(e) => setInputText(e.target.value)} type="text" /> */}
      <input onChange={(e) => setInputText(e.target.value)} type="text" />
      <button onClick={() => send()}>send</button>
    </div>
  );
};

export default App;
