import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import ReactHowler from 'react-howler';
import MessageSound from '../../assets/sounds/message.mp3';
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
  const [messageSound, setMessageSound] = useState(false);
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [userImage, setUserImage] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');
  // const [typing, setTyping] = useState([]);

  let chatMessages = useRef();

  useEffect(() => {
    let socket;
    socket = io(ENDPOINT);
    setSocket(socket);

    const { username, room } = queryString.parse(location.search);
    setRoom(room);
    setName(username);

    socket.emit('joinRoom', { username, room });

    socket.on('roomusers', (users) => {
      setUsers(users.users);
    });

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
      setMessageSound(true);
      chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
    });

    if (userImage) {
      socket.emit('showImage', userImage);
    }

    socket.on('uploadedImage', (image) => {
      console.log('image back from server', image);
    });

    // user is typing
    // socket.on('messageTyping', (userTypingMessage) => {
    //   setTyping((typing) => [...typing, userTypingMessage]);
    // });
  }, [ENDPOINT, location.search, userImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSound(false);

    socket.emit('chatMessage', userMessage);
    setUserMessage('');
    // setTyping('');
  };

  const handleChage = (e) => {
    setUserMessage(e.target.value);
    setMessageSound(false);
    // socket.emit('typing', name, room);
  };

  const getImageFromSend = (image) => {
    setUserImage(image);
  };

  console.log('render');

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
            <Message
              message={message}
              name={name}
              // typing={typing}
            />
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
      <ReactHowler src={MessageSound} playing={messageSound} />
    </div>
  );
};

export default Chat;
