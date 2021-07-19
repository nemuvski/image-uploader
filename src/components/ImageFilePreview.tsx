import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import { ImageUploaderContext } from '../contexts/ImageUploaderContext';

const useStyles = makeStyles({
  root: {
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    verticalAlign: 'middle',
  },
});

const ImageFilePreview: React.FC = () => {
  const classes = useStyles();
  const { targetFile } = useContext(ImageUploaderContext);

  if (!targetFile) return null;

  return (
    <div className={classes.root}>
      <img className={classes.image} src={URL.createObjectURL(targetFile)} alt={targetFile.name} />
    </div>
  );
};

export default ImageFilePreview;
