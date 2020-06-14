import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Emoji from '@material-ui/icons/TagFaces';
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
    '&:before': {
      borderBottom: '10px solid red',
    },
  },
}));

const Send = ({
  getImageFromSend,
  handleChage,
  handleSubmit,
  userMessage,
  getEmoji,
}) => {
  const classes = useStyles();

  const [image, setImage] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const getImage = (image) => {
    setImage(image);
    getImageFromSend(image);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  getEmoji(chosenEmoji);

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
          autoFocus
          autoComplete='off'
          InputProps={{
            endAdornment: (
              <InputAdornment
                position='end'
                style={{ display: 'flex', marginRight: 7 }}
              >
                <UploadImage image={image} getImage={getImage} />
                <Button
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                  style={{ minWidth: 40 }}
                >
                  <Emoji />
                </Button>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
        <Button variant='contained' type='submit' className={classes.send}>
          Send
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </Menu>
      </form>
    </div>
  );
};

export default Send;
