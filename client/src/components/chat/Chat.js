import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BG from '../../assets/bg.png';
import queryString from 'query-string';
import ReactHowler from 'react-howler';
import MessageSound from '../../assets/sounds/message.mp3';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';
import Code from '@material-ui/icons/Code';
import UsersOnline from './UsersOnline';
import Send from './Send';
import Message from './Message';
import auth from '../../auth/auth';

const useStyles = makeStyles(() => ({
  bg: {
    backgroundImage: `url(${BG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '1px 0',
  },
}));

let socket;

const Chat = ({ location, history }) => {
  // const ENDPOINT = 'localhost:5000';
  const classes = useStyles();

  const [messageSound, setMessageSound] = useState(false);
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  const [socketIdClient, setSocketIdClient] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [userImage, setUserImage] = useState('');
  // const [emoji, setEmoji] = useState('');
  let chatMessages = useRef();

  useEffect(() => {
    // socket = io(ENDPOINT); for local
    socket = io('https://chatcode0.vercel.app/'); // for heroku

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

    return () => {
      socket.emit('disconnect');
      socket.close();
    };

    // socket.on('clearTypingMessage', (filtredMessages) => {
    //   console.log(filtredMessages);
    //   setMessages([...messages, filtredMessages]);
    // });
  }, [location.search]);

  useEffect(() => {
    setSocketIdClient(socket);
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

  // const getEmoji = (emoji) => {
  //   setEmoji(emoji);
  // };

  const leaveRoom = () => {
    let leave = window.confirm('Are you sure you want to leave ?');
    if (leave) {
      auth.logout(() => {
        socket.disconnect();
        history.push('/');
      });
    }
  };

  return (
    <div className={classes.bg}>
      <div className='chat-container'>
        <header className='chat-header'>
          <h1>
            <Code className='chat-code-icon' /> <span>Chat Code</span>
          </h1>
          <Button
            className='leave-room'
            variant='contained'
            color='secondary'
            onClick={leaveRoom}>
            Leave Room
          </Button>
        </header>
        <main className='chat-main'>
          <UsersOnline users={users} room={room} id={socketIdClient} />
          <div
            className='chat-messages'
            ref={chatMessages}
            style={{ position: 'relative' }}>
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
          // getEmoji={getEmoji}
        />
        <ReactHowler src={MessageSound} playing={messageSound} />
      </div>
    </div>
  );
};

export default Chat;
