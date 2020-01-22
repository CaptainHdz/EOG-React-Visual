import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    chip: {
      marginTop: 20,
      marginBottom: 0,
      marginLeft: 20
    }
  }),
);


export default (props) => {
  const classes = useStyles();

  return (
    <Chip
        className={classes.chip}
        // avatar={<Avatar>F</Avatar>}
        label={props.name}
        clickable
        color="primary"
        onClick={props.handleChipClick}
      />
  );
}
