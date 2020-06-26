// import
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
// const { clearTyping, formatMessage } = require('./utils/messages');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');
// import

// init
const app = express();
const server = http.createServer(app);
const io = socketio(server);
// init

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
// a
const botName = 'ChatCode Bot';

// run with client connects
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Chat Code !'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // send users and room info
    io.to(user.room).emit('roomusers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // listen for chatMessage
  socket.on('chatMessage', (message) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, message));
  });

  // display imgaes
  socket.on('showImage', (image) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, null, image));
  });

  // display user is typing ....
  socket.on('typing', (typing) => {
    const user = getCurrentUser(socket.id);
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(user.username, null, null, typing));
  });

  // clear user is typing ....
  // socket.on('clearTyping', (messages) => {
  //   const user = getCurrentUser(socket.id);
  //   socket.broadcast
  //     .to(user.room)
  //     .emit('clearTypingMessage', clearTyping(messages));
  // });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat `)
      );

      // send users and room info
      io.to(user.room).emit('roomusers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server runnigg on port ${PORT}`));
