import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Group from '@material-ui/icons/Group';
import Online from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  icon: {
    border: '1px solid #fff',
    borderRadius: '50%',
    background: '#fff',
    color: '#3c4c61',
    fontSize: 28,
    position: 'relative',
    top: 4,
  },
  online: {
    position: 'relative',
    top: 7,
    right: 2,
    color: '#06f706',
  },
  you: {
    marginLeft: 5,
  },
}));

const UsersOnline = ({ users, room, onlyUser }) => {
  const classes = useStyles();

  return (
    <div className='chat-sidebar'>
      <h3>
        <i className='fas fa-comments'></i> Room Name:
      </h3>
      <h2 id='room-name'>{room}</h2>
      <h3>
        <i className='fas fa-users'></i>
        <Group
          className={classes.icon}
          style={{ top: 8, right: 8, padding: 3 }}
        />
        Users Online
      </h3>
      <ul id='users'>
        {users.map((user) => (
          <li key={user.id}>
            <Online className={classes.online} />
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersOnline;
