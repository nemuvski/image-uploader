import React, { useContext } from 'react';
import { Card, CardContent, makeStyles, CardHeader, Typography } from '@material-ui/core';
import { ImageUploaderContext, ImageUploaderScreen } from '../contexts/ImageUploaderContext';
import InitialScreen from './screens/InitialScreen';
import PreviewScreen from './screens/PreviewScreen';
import CroppingScreen from './screens/CroppingScreen';
import UploadingScreen from './screens/UploadingScreen';
import DoneScreen from './screens/DoneScreen';

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
  errorText: {
    marginBottom: 16,
  },
});

const ImageUploader: React.FC = () => {
  const classes = useStyles();
  const { currentScreen, errorMessage } = useContext(ImageUploaderContext);

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
        {currentScreen === ImageUploaderScreen.INITIAL && <InitialScreen />}

        {/* 画像ファイル選択後のプレビュー */}
        {currentScreen === ImageUploaderScreen.PREVIEW && <PreviewScreen />}

        {/* トリミング */}
        {currentScreen === ImageUploaderScreen.CROPPING && <CroppingScreen />}

        {/* アップロード中 */}
        {currentScreen === ImageUploaderScreen.UPLOADING && <UploadingScreen />}

        {/* 完了 */}
        {currentScreen === ImageUploaderScreen.DONE && <DoneScreen />}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
