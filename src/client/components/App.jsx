import React, { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
import MainContainer from '../containers/MainContainer';
import { socket } from '../helpers/socket'

const App = (props) => {

  const [inputText, setInputText] = useState('');
  const send = () => {
    console.log('sending text ', inputText);
    socket.emit('updateServerState', inputText);
  };

  return (
    <div>
      <MainContainer />
      {/* <input onChange={(e) => setInputText(e.target.value)} type="text" /> */}
      {/* <button onClick={() => send()}>send</button> */}
    </div>
  );
};

export default App;
