import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../../Assets/logo.jpg'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  image: {
    height: '3rem',
    marginRight: '1rem'
  }
}));

export default function ButtonAppBar({ buttonAction }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <img src={logo} className={classes.image} alt="logo" />
          </div>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
          <Button color="inherit" onClick={() => buttonAction()}>Add User</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
