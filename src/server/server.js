const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cache = require('./cache')();

app.use(express.static(path.resolve(__dirname, '/')));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('updateServerState', (msg, senderId) => {
    // set cached state and broadcast to clients
    cache.set('state', msg)
    console.log(msg.users)
    io.emit('updateClientState', cache.get('state'), senderId);
  });

  // if board has already been initialized, send state to client
  socket.on('getInitialState', () => {
    if (cache.get('users')) io.emit('updateClientState', cache.get('state'));
    else (io.emit('firstUser'))
  })
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
