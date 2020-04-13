import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Code from '@material-ui/icons/Code';
import UsersOnline from './UsersOnline';
import Messages from './Messages';
import Send from './Send';

const useStyles = makeStyles((theme) => ({
  icon: {
    border: '1px solid #fff',
    borderRadius: '50%',
    background: '#fff',
    color: '#3c4c61',
    fontSize: 28,
    position: 'relative',
    top: 4,
  },
}));

const Chat = ({ location }) => {
  const classes = useStyles();

  const ENDPOINT = 'localhost:5000';
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    let socket;

    const { username, room } = queryString.parse(location.search);
    setRoom(room);

    socket = io(ENDPOINT);
    setSocket(socket);

    socket.emit('joinRoom', { username, room });

    socket.on('message', (message) => {
      setMessages([message]);
      console.log(messages);
    });

    socket.on('roomusers', (users) => {
      setUsers(users.users);
    });

    console.log(socket);
  }, [ENDPOINT, location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', userMessage);
    setUserMessage('');
  };

  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <h1>
          <Code className={classes.icon} /> <span>Chat Code</span>
        </h1>
        <Link to='/'>
          <Button variant='contained' color='secondary'>
            Leave Room
          </Button>
        </Link>
      </header>
      <main className='chat-main'>
        <UsersOnline users={users} room={room} />
        <Messages messages={messages} />
      </main>
      <Send
        handleSubmit={handleSubmit}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
      />
    </div>
  );
};

export default Chat;
