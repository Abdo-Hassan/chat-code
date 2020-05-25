import React, { Fragment } from 'react';
import ReactEmoji from 'react-emoji';

const Message = ({
  message: { username, text, time, image, typing },
  name,
}) => {
  let isSentByCurrentUser = false;
  if (username === name) {
    isSentByCurrentUser = true;
  }

  return (
    <Fragment>
      {text || image ? (
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
            <span>{isSentByCurrentUser ? 'You' : username}</span> {''}
            <span>{time}</span>
          </p>
          <p
            className='text'
            style={{ color: isSentByCurrentUser ? '#fff' : '#000' }}
          >
            <span>{ReactEmoji.emojify(text)}</span>
          </p>
          {image && <img src={image} alt='uploded' className='user-image' />}
        </div>
      ) : null}

      {typing && <p className='typing'> {username} is typing....</p>}
    </Fragment>
  );
};

export default Message;
