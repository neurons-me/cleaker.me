import React, { useEffect } from 'react';
import Webcam from 'react-webcam';
import { Modal, Box, Button, Typography } from '@mui/material';

export default function FaceScan({ open, onCapture, onClose }) {
  const webcamRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
        console.log("Camera permission state:", permissionStatus.state);
        if (permissionStatus.state === "denied") {
          alert("Camera permission is blocked. Please enable it in your browser settings.");
        }
      });
    }
  }, [open]);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc); // Send the captured image back to the parent component
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="face-scan-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Face Scan
        </Typography>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={{
            facingMode: "user", // Use front camera
          }}
          style={{ borderRadius: 10 }}
        />
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleCapture}>
            Capture
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}