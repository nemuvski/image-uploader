import React from 'react';
import { Card, CardContent, makeStyles, Button, CardHeader, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 550,
    margin: 'auto',
    padding: 0,
  },
  form: {
    textAlign: 'center',
  },
  input: {
    display: 'none',
  },
  helpText: {
    marginTop: 8,
  },
});

const ImageUploader: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title='Image Uploader' />
      <CardContent className={classes.form}>
        <Button color='primary' startIcon={<ImageIcon />} variant='contained' component='label'>
          Select an image file
          <input type='file' className={classes.input} accept='image/jpeg, image/png' />
        </Button>
        <Typography color='textSecondary' component='p' className={classes.helpText}>
          Format: png, jpeg
          <br />
          Limit File Size: 1MB
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
