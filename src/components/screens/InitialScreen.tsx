import React, { ChangeEvent, useContext } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { ImageUploaderContext } from '../../contexts/ImageUploaderContext';

const useStyles = makeStyles({
  helpText: {
    marginTop: 16,
  },
});

const InitialScreen: React.FC = () => {
  const classes = useStyles();
  const { setFile } = useContext(ImageUploaderContext);

  /**
   * 入力フォームのイベントハンドラ
   *
   * @param event イベント
   */
  const onInputFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length) setFile(files[0]);
  };

  return (
    <Box>
      <Button color='primary' startIcon={<ImageIcon />} variant='contained' component='label'>
        Select an image file
        <input hidden type='file' accept='image/jpeg, image/png' onChange={onInputFileHandler} />
      </Button>
      <Typography color='textSecondary' component='p' className={classes.helpText}>
        Format: png, jpeg
        <br />
        Limit File Size: 1MB
      </Typography>
    </Box>
  );
};

export default InitialScreen;
