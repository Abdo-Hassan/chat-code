import React from 'react';
import Group from '@material-ui/icons/Group';
import Online from '@material-ui/icons/FiberManualRecord';

const UsersOnline = ({ users, room }) => {
  return (
    <div className='chat-sidebar'>
      <h3 className='room-name'>
        <i className='fas fa-comments'></i> Room Name
      </h3>
      <h2 id='room-name'>{room}</h2>
      <h3 className='users-online'>
        <i className='fas fa-users'></i>
        <Group
          className='group-icon'
          style={{ top: 8, right: 8, padding: 3 }}
        />
        Users Online
      </h3>
      <ul id='users'>
        {users.map((user) => (
          <li key={user.id}>
            <Online className='online-icon' />
            <span className='username'>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersOnline;
