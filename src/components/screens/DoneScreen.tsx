import React, { useContext } from 'react';
import { ImageUploaderContext } from '../../contexts/ImageUploaderContext';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
  bottomButton: {
    marginTop: 16,
  },
});

const UploadingScreen: React.FC = () => {
  const classes = useStyles();
  const { clearFile } = useContext(ImageUploaderContext);

  return (
    <Box>
      <Typography component='p'>Upload succeeded!</Typography>
      <Button
        variant='contained'
        color='primary'
        startIcon={<DoneIcon />}
        onClick={() => clearFile()}
        className={classes.bottomButton}
      >
        OK
      </Button>
    </Box>
  );
};

export default UploadingScreen;
