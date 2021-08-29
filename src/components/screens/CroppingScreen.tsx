import React, { useContext, useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { ImageUploaderContext, ImageUploaderScreen } from '../../contexts/ImageUploaderContext';
import { Box, Button, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CropIcon from '@material-ui/icons/Crop';

const useStyles = makeStyles({
  cropper: {
    marginBottom: 16,
  },
});

const CroppingScreen: React.FC = () => {
  const classes = useStyles();
  const { targetFile, setScreen, setCroppedImageData } = useContext(ImageUploaderContext);
  const cropperRef = useRef<ReactCropperElement>(null);

  /**
   * OKボタン押下時のイベント
   */
  const handleClickOkButton = () => {
    const imageElement = cropperRef?.current;
    if (!imageElement) return;
    imageElement.cropper.getCroppedCanvas().toBlob(
      (blob) => {
        if (blob) {
          setCroppedImageData(blob);
        }
      },
      'image/jpeg',
      0.9
    );
    setScreen(ImageUploaderScreen.PREVIEW);
  };

  return (
    <Box>
      <Cropper
        className={classes.cropper}
        ref={cropperRef}
        src={URL.createObjectURL(targetFile)}
        guides={false}
        responsive={true}
        background={true}
        minCropBoxHeight={32}
        minCropBoxWidth={32}
        rotatable={false}
        autoCrop={true}
        autoCropArea={1}
        viewMode={1}
        zoomable={false}
        scalable={false}
      />
      <Box display='flex' alignItems='center' justifyContent='space-evenly'>
        <Button variant='contained' startIcon={<ClearIcon />} onClick={() => setScreen(ImageUploaderScreen.PREVIEW)}>
          Back
        </Button>
        <Button color='primary' variant='contained' startIcon={<CropIcon />} onClick={handleClickOkButton}>
          OK
        </Button>
      </Box>
    </Box>
  );
};

export default CroppingScreen;
