import React, { useContext } from 'react';
import { ImageUploaderContext, ImageUploaderScreen } from '../../contexts/ImageUploaderContext';
import ImageFilePreview from '../ImageFilePreview';
import { Box, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CropIcon from '@material-ui/icons/Crop';
import PublishIcon from '@material-ui/icons/Publish';

const PreviewScreen: React.FC = () => {
  const { clearFile, uploadFile, setScreen } = useContext(ImageUploaderContext);

  return (
    <Box>
      <ImageFilePreview />
      <Box display='flex' alignItems='center' justifyContent='space-evenly'>
        <Button color='secondary' variant='contained' startIcon={<ClearIcon />} onClick={() => clearFile()}>
          Cancel
        </Button>
        <Button variant='contained' startIcon={<CropIcon />} onClick={() => setScreen(ImageUploaderScreen.CROPPING)}>
          Crop
        </Button>
        <Button color='primary' variant='contained' startIcon={<PublishIcon />} onClick={() => uploadFile()}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PreviewScreen;
