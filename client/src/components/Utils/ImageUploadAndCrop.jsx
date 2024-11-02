import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ImageUploadAndCrop({ onCropComplete }) {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    onCropComplete(croppedAreaPixels); // Pass cropped pixels back to parent
  }, [onCropComplete]);

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      {!image ? (
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed grey',
            padding: '20px',
            cursor: 'pointer',
            borderRadius: 2,
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1">Drag and drop an image, or click to select one</Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 300,
              backgroundColor: '#333',
              borderRadius: 2,
            }}
          >
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1} // 1:1 aspect ratio for profile pictures
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </Box>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setImage(null)}
            sx={{ mt: 2 }}
          >
            Upload New Image
          </Button>
        </>
      )}
    </Box>
  );
}