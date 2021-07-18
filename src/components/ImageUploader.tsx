import React, { ChangeEvent, useState } from 'react';
import { Card, CardContent, makeStyles, Button, CardHeader, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import ImageFilePreview from './ImageFilePreview';

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
  helpText: {
    marginTop: 16,
  },
  errorText: {
    marginBottom: 16,
  },
});

const ImageUploader: React.FC = () => {
  const classes = useStyles();

  const [isError, setIsError] = useState(false);
  const [inputImageFile, setInputImageFile] = useState<File | undefined>();

  /**
   * 入力フォームのイベントハンドラ
   *
   * @param event イベント
   */
  const onInputFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || !files.length) return;

    const file = files[0];

    // 1MBを超えている場合はエラーとする
    if (file.size > 1024 * 1024) {
      setIsError(true);
      setInputImageFile(undefined);
    } else {
      setIsError(false);
      setInputImageFile(file);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader title='Image Uploader' />
      <CardContent className={classes.form}>
        {/* プレビュー */}
        <ImageFilePreview file={inputImageFile} />

        {/* エラー時のメッセージ */}
        {isError && (
          <Typography color='secondary' component='p' className={classes.errorText}>
            The selected file is larger than 1MB.
          </Typography>
        )}

        {/* フォーム */}
        <Button color='primary' startIcon={<ImageIcon />} variant='contained' component='label'>
          Select an image file
          <input hidden type='file' accept='image/jpeg, image/png' onChange={onInputFileHandler} />
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
