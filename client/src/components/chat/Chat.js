import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import ReactHowler from 'react-howler';
import MessageSound from '../../assets/sounds/message.mp3';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Code from '@material-ui/icons/Code';
import UsersOnline from './UsersOnline';
import Send from './Send';
import Message from './Message';

let socket;

const Chat = ({ location }) => {
  const ENDPOINT = 'localhost:5000';

  const [messageSound, setMessageSound] = useState(false);
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [socketIdClient, setSocketIdClient] = useState('');
  // const [onlyUser, setOnlyUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [userImage, setUserImage] = useState('');
  let chatMessages = useRef();

  useEffect(() => {
    socket = io(ENDPOINT);

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

    // socket.on('clearTypingMessage', (filtredMessages) => {
    //   console.log(filtredMessages);
    //   setMessages([...messages, filtredMessages]);
    // });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    setSocketIdClient(socket);
    // users.map((user) => {
    //   if (user.id === socketIdClient.id) {
    //     setOnlyUser(true);
    //   } else {
    //     setOnlyUser(false);
    //   }
    //   return user.id;
    // });
  }, [users, socketIdClient.id]);

  useEffect(() => {
    if (userImage) {
      socket.emit('showImage', userImage);
    }
  }, [userImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSound(false);
    socket.emit('chatMessage', userMessage);
    // socket.emit('clearTyping', messages);
    setUserMessage('');
  };

  const handleChage = (e) => {
    setUserMessage(e.target.value);
    // if (userMessage.length === 0) {
    //   socket.emit('typing', true);
    // }
    setMessageSound(false);
  };

  const getImageFromSend = (image) => {
    setUserImage(image);
  };

  const getEmoji = (emoji) => {
    console.log('chosenEmoji from send', emoji);
  };

  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <h1>
          <Code className='chat-code-icon' /> <span>Chat Code</span>
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
            <Message message={message} name={name} />
          ))}
        </div>
      </main>
      <Send
        getImageFromSend={getImageFromSend}
        handleSubmit={handleSubmit}
        handleChage={handleChage}
        userMessage={userMessage}
        setUserMessage={setUserMessage}
        getEmoji={getEmoji}
      />
      <ReactHowler src={MessageSound} playing={messageSound} />
    </div>
  );
};

export default Chat;
