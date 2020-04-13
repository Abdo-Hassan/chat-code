import React, { useState } from 'react';
import BG from '../../assets/bg.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Code from '@material-ui/icons/Code';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BG})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3c4d61',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: '#3c4d61',
    color: '#fff',
    padding: '15px 0px',
    width: '37%',
    margin: '20px auto',
    display: 'block',
    borderRadius: 40,
    '&:hover': {
      backgroundColor: '#3c4d61d4',
    },
  },
  formControl: {
    margin: 'theme.spacing(1) 0',
    minWidth: '100%',
  },
}));

const Join = ({ history }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleChange = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && room) {
      history.push(`/chat?username=${username}&room=${room}`);
    }
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Code />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Chat Code
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Enter your name'
              name='username'
              autoComplete='username'
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl variant='filled' className={classes.formControl}>
              <InputLabel id='demo-simple-select-label'>
                Choose a room
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={room}
                name='room'
                onChange={handleChange}
                required
              >
                <MenuItem value='Javascript'>Javascript</MenuItem>
                <MenuItem value='Python'>Python</MenuItem>
                <MenuItem value='React'>React</MenuItem>
                <MenuItem value='Java'>Java</MenuItem>
              </Select>
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
            >
              Join
            </Button>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={6} md={8} className={classes.image} />
    </Grid>
  );
};

export default Join;
