const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
      io.emit('user-dis', 'a user has disconnected')
    });

    socket.on('chat-message', message=>{
      io.emit('chat-message', message)
    })
  });
  

  http.listen(5050, () => {
    console.log('listening on *:5050');
  });