// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('chat message', 'A user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', 'A user disconnected');
  });

  // Send a random number to all clients every second
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
