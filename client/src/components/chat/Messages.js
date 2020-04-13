import React from 'react';

const Messages = ({ messages }) => {
  return (
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
  );
};

export default Messages;
