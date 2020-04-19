import React, { Fragment } from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({
  message: { username, text, time, image },
  name,
  // typing,
}) => {
  let isSentByCurrentUser = false;
  if (username === name) {
    isSentByCurrentUser = true;
  }

  return (
    <Fragment>
      <div
        className='message'
        style={{
          backgroundColor: isSentByCurrentUser ? '#0084FF' : '#e7e7e7',
          marginLeft: isSentByCurrentUser ? '50%' : '0',
        }}
        key={Math.random() * 10000}
      >
        <p
          className='meta'
          style={{
            color: isSentByCurrentUser ? '#fff' : '#3c4d61',
          }}
        >
          <span>{username}</span> {''}
          <span>{time}</span>
        </p>
        <p
          className='text'
          style={{ color: isSentByCurrentUser ? '#fff' : '#000' }}
        >
          <span>{ReactEmoji.emojify(text)}</span>
        </p>
      </div>
      {image && (
        <div
          style={{
            marginLeft: isSentByCurrentUser ? '50%' : '0',
          }}
          key={Math.random() * 10000}
        >
          <img
            src={image}
            alt='uploded'
            style={{ width: 200, borderRadius: 10 }}
          />
        </div>
      )}
      {/* {typing &&
        typing.map((t) => (
          <p className='typing'> {t.userTyping} is typing....</p>
        ))} */}
    </Fragment>
  );
};

export default Message;
