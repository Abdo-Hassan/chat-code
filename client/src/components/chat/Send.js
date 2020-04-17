import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import UploadImage from './UploadImage';

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
  input: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 0,
  },
}));

const Send = ({ handleChage, handleSubmit, userMessage, setUserMessage }) => {
  const classes = useStyles();

  return (
    <div className='chat-form-container'>
      <form id='chat-form' onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          id='input-with-icon-adornment'
          type='text'
          placeholder='Type a message ...'
          fullWidth
          value={userMessage}
          onChange={handleChage}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' style={{ marginRight: 7 }}>
                <UploadImage />
              </InputAdornment>
            ),
          }}
        />
        <Button variant='contained' type='submit' className={classes.send}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Send;
