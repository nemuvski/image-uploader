import React from 'react';
import { makeStyles } from '@material-ui/core';

type Props = {
  file?: File;
};

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

const ImageFilePreview: React.FC<Props> = ({ file }) => {
  const classes = useStyles();

  if (!file) return null;

  return (
    <div className={classes.root}>
      <img className={classes.image} src={URL.createObjectURL(file)} alt={file.name} />
    </div>
  );
};

export default ImageFilePreview;
