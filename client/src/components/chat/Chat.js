import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Code from '@material-ui/icons/Code';
import UsersOnline from './UsersOnline';
import Send from './Send';
import Message from './Message';

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
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [userImage, setUserImage] = useState([]);
  const [typing, setTyping] = useState([]);

  let chatMessages = useRef();

  useEffect(() => {
    // !init socket
    let socket;
    socket = io(ENDPOINT);
    setSocket(socket);

    // !get user name & room from URL
    const { username, room } = queryString.parse(location.search);
    setRoom(room);
    setName(username);

    // !join room
    socket.emit('joinRoom', { username, room });

    // !get all online users
    socket.on('roomusers', (users) => {
      setUsers(users.users);
    });

    // !get all messages
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
      // chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
    });

    // !user is typing
    socket.on('messageTyping', (userTypingMessage) => {
      setTyping((typing) => [...typing, userTypingMessage]);
    });
  }, [ENDPOINT, location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', userMessage);
    setUserMessage('');
    setTyping('');
  };

  const handleChage = (e) => {
    setUserMessage(e.target.value);
    socket.emit('typing', name, room);
  };

  const getImageFromSend = (image) => {
    setUserImage(image);
  };

  console.log(userImage);

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
        <UsersOnline users={users} room={room} name={name} />
        <div
          className='chat-messages'
          ref={chatMessages}
          style={{ position: 'relative' }}
        >
          {messages.map((message) => (
            <Message message={message} name={name} typing={typing} />
          ))}
        </div>
      </main>
      <Send
        getImageFromSend={getImageFromSend}
        handleSubmit={handleSubmit}
        handleChage={handleChage}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
      />
    </div>
  );
};

export default Chat;
