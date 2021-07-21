import React, { useContext } from 'react';
import { ImageUploaderContext } from '../../contexts/ImageUploaderContext';
import { Box, Button, LinearProgress, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  bottomButton: {
    marginTop: 16,
  },
});

const UploadingScreen: React.FC = () => {
  const classes = useStyles();
  const { clearFile, uploadProgress, errorMessage } = useContext(ImageUploaderContext);

  return (
    <Box>
      <Box width='100%'>
        <LinearProgress variant='determinate' value={uploadProgress} />
      </Box>
      {errorMessage && (
        <Button
          variant='contained'
          startIcon={<ClearIcon />}
          onClick={() => clearFile()}
          className={classes.bottomButton}
        >
          Suspend
        </Button>
      )}
    </Box>
  );
};

export default UploadingScreen;
