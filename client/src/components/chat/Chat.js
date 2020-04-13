import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Code from '@material-ui/icons/Code';
import Group from '@material-ui/icons/Group';
import Online from '@material-ui/icons/FiberManualRecord';

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
  online: {
    position: 'relative',
    top: 7,
    right: 2,
    color: '#06f706',
  },
  send: {
    color: '#fff',
    backgroundColor: '#0d824c',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    '&:hover': {
      backgroundColor: '#0e9f5c',
    },
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
      setMessages([...messages, message]);
    });

    socket.on('roomusers', (users) => {
      setUsers(users.users);
    });

    console.log(socket);
  }, [ENDPOINT, location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', userMessage);
  };

  console.log(socket);

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
        <div className='chat-sidebar'>
          <h3>
            <i className='fas fa-comments'></i> Room Name:
          </h3>
          <h2 id='room-name'>{room}</h2>
          <h3>
            <i className='fas fa-users'></i>
            <Group
              className={classes.icon}
              style={{ top: 8, right: 8, padding: 3 }}
            />
            Users Online
          </h3>
          <ul id='users'>
            {users.map((user) => (
              <li key={user.id}>
                <Online className={classes.online} />
                {user.username}
              </li>
            ))}
          </ul>
        </div>

        <div className='chat-messages'>
          {messages.map((message) => (
            <div className='message' key={Math.random() * 10000}>
              <p className='meta'>
                {message.username} {''}
                <span>{message.time}</span>
              </p>
              <p className='text'>{message.text}</p>
            </div>
          ))}
        </div>
      </main>
      <div className='chat-form-container'>
        <form id='chat-form' onSubmit={handleSubmit}>
          <input
            id='msg'
            type='text'
            placeholder='Type a message ...'
            required
            autoComplete='off'
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            autoFocus
          />
          <Button variant='contained' type='submit' className={classes.send}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
