import React from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { username, text, time }, name }) => {
  let isSentByCurrentUser = false;
  if (username === name) {
    isSentByCurrentUser = true;
  }

  return (
    <div
      className='chat-messages'
      style={{
        position: isSentByCurrentUser ? 'relative' : 'unset',
      }}
    >
      <div
        className='message'
        style={{
          backgroundColor: isSentByCurrentUser ? '#0084FF' : '#e7e7e7',
          margin: isSentByCurrentUser ? '0 0 0 auto' : '0',
          order: isSentByCurrentUser ? 1 : 0,
        }}
        key={Math.random() * 10000}
      >
        <p
          className='text'
          style={{ color: isSentByCurrentUser ? '#fff' : '#000' }}
        >
          <span>{text}</span>
        </p>
      </div>
      <p
        className='meta'
        style={{
          position: isSentByCurrentUser ? 'absolute' : 'unset',
          left: isSentByCurrentUser ? '34%' : 'unset',
          top: isSentByCurrentUser ? '13%' : 'unset',
        }}
      >
        <span>{username}</span> {''}
        <span>{time}</span>
      </p>
    </div>
  );
};

export default Message;
