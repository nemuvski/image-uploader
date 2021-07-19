import React, { ChangeEvent, useContext } from 'react';
import { Card, CardContent, makeStyles, Button, CardHeader, Typography, Box, LinearProgress } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import PublishIcon from '@material-ui/icons/Publish';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import ImageFilePreview from './ImageFilePreview';
import { ImageUploaderContext, ImageUploaderScreen } from '../contexts/ImageUploaderContext';

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
  bottomButton: {
    marginTop: 16,
  },
});

const ImageUploader: React.FC = () => {
  const classes = useStyles();
  const { screen, clearFile, setFile, uploadFile, uploadProgress, errorMessage } = useContext(ImageUploaderContext);

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
    <Card className={classes.root}>
      <CardHeader title='Image Uploader' />
      <CardContent className={classes.form}>
        {/* エラー時のメッセージ */}
        {errorMessage && (
          <Typography color='error' component='p' className={classes.errorText}>
            {errorMessage}
          </Typography>
        )}

        {/* 画像ファイルの選択 */}
        {screen === ImageUploaderScreen.INITIAL && (
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
        )}

        {/* 画像ファイル選択後のプレビュー */}
        {screen === ImageUploaderScreen.PREVIEW && (
          <>
            <ImageFilePreview />
            <Box display='flex' alignItems='center' justifyContent='space-evenly'>
              <Button variant='contained' startIcon={<ClearIcon />} onClick={() => clearFile()}>
                Cancel
              </Button>
              <Button color='primary' variant='contained' startIcon={<PublishIcon />} onClick={() => uploadFile()}>
                Submit
              </Button>
            </Box>
          </>
        )}

        {/* アップロード中 */}
        {screen === ImageUploaderScreen.UPLOADING && (
          <>
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
          </>
        )}

        {/* 完了 */}
        {screen === ImageUploaderScreen.DONE && (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
