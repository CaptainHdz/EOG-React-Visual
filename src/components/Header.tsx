import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Weather from '../Features/Weather/Weather';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    marginRight: '10%',
    textDecorationLine: 'none'
  },
  
});

export default () => {
  const classes = useStyles();

  const name = "Mauricio Hernandez's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {name} EOG React Visualization Assessment
        </Typography>
        <Link className={classes.link} to="/charts"><h2>Graphs</h2></Link>
        <Link className={classes.link} to='/'><h2>Instructions</h2></Link>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
