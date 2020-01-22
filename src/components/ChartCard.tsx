import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: 'auto',
        marginTop: '2%',
        width: theme.spacing(140),
        height: theme.spacing(75),
      },
    },
  }),
);

export default (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <h1>{props.chartType}</h1>
            {props.children}
      </Paper>
    </div>
  );
}