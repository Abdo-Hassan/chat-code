import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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

const Send = ({ handleSubmit, userMessage, setUserMessage }) => {
  const classes = useStyles();

  return (
    <div className='chat-form-container'>
      <form id='chat-form' onSubmit={handleSubmit}>
        <input
          id='msg'
          type='text'
          // ref={inputRef}
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
  );
};

export default Send;
