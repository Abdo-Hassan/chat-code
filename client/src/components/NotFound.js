import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NotFoundBG from '../assets/404.jpg';
const useStyles = makeStyles(() => ({
  bg: {
    backgroundImage: `url(${NotFoundBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return <div className={classes.bg}></div>;
};

export default NotFound;
