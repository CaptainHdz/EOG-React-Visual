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
        marginTop: '5%',
        width: theme.spacing(120),
        height: theme.spacing(70),
      },
    },
  }),
);

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper />
    </div>
  );
}