const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.resolve(__dirname, '/')));

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('sendMessage', (socket) => {
  console.log('received sendMessage');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
