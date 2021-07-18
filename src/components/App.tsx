import React from 'react';
import ImageUploader from './ImageUploader';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 16,
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageUploader />
    </div>
  );
};

export default App;
