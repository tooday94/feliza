import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles({
  truncatedText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%', // Ensure the text doesn't overflow its container
  },
});

function TruncatedTypography({ text }) {
  const classes = useStyles();

  return (
    <Typography className={classes.truncatedText}>
      {text}
    </Typography>
  );
}

export default TruncatedTypography;
