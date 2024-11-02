//src/components/Me.jsx
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Stack,
  Button,
  Divider,
  Typography,
  Card,
  CardActions,
  Avatar,
  IconButton,
  Chip,
  TextField,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditorToolbar from './Utils/EditorToolbar';
import CountrySelector from './Utils/CountrySelector';
import VisibilitySelector from './Utils/VisibilitySelector';
import FaceScan from './FaceScan/FaceScan';

export default function MyProfile() {
  const [languages, setLanguages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [faceImage, setFaceImage] = useState(null);
  const [isFaceScanOpen, setIsFaceScanOpen] = useState(false);

  const handleCapture = (imageData) => {
    setFaceImage(imageData);
    setIsFaceScanOpen(false);
  };

  const handleOpenFaceScan = () => setIsFaceScanOpen(true);
  const handleCloseFaceScan = () => setIsFaceScanOpen(false);

  const [visibilitySettings, setVisibilitySettings] = useState({
    name: 'public',
    lastName: 'public',
    languages: 'public',
    email: 'public',
    country: 'public',
    timezone: 'public',
  });

  const handleKeyDown = (event) => {
    if ((event.key === ' ' || event.key === 'Enter') && inputValue.trim()) {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !languages.includes(trimmedValue)) {
        setLanguages([...languages, trimmedValue]);
        setInputValue('');
      }
    }
  };

  const handleDelete = (languageToDelete) => {
    setLanguages((prevLanguages) =>
      prevLanguages.filter((language) => language !== languageToDelete)
    );
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleVisibilityChange = (field, value) => {
    setVisibilitySettings((prevSettings) => ({
      ...prevSettings,
      [field]: value,
    }));
  };

  let firstLetter = 'S';

  return (
    <Box
      sx={{
        flex: 1,
        width: '100%',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Stack
        spacing={4}
        sx={{
          maxWidth: 800,
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 4 },
        }}
      >
        <Card sx={{ bgcolor: 'background.paper', borderRadius: 2, p: 2 }}>
          <Typography variant="h6" component="h2" color="text.primary">
            Personal Info
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }} color="text.secondary">
            Customize how your profile information will appear to the networks.
          </Typography>
          <Divider />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexBasis: '30%' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 120, // Ajusta el tamaño aquí para hacerlo proporcional
                  height: 120,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'grey',
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    fontSize: 40,
                    fontWeight: 'bold',
                    borderRadius: '50%',
                  }}
                >
                  {firstLetter}
                </Avatar>
                <IconButton
                  aria-label="Edit Profile Picture"
                  onClick={handleOpenFaceScan}
                  sx={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderRadius: '50%',
                    boxShadow: 1,
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Form Fields */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Username</InputLabel>
                <Input
                  placeholder="First name"
                  endAdornment={
                    <VisibilitySelector
                      value={visibilitySettings.name}
                      onChange={(value) => handleVisibilityChange('name', value)}
                    />
                  }
                />
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Name</InputLabel>
                <Input
                  placeholder="Last name"
                  endAdornment={
                    <VisibilitySelector
                      value={visibilitySettings.lastName}
                      onChange={(value) => handleVisibilityChange('lastName', value)}
                    />
                  }
                />
              </FormControl>


          <FormControl sx={{ flex: 1 }}>
          <InputLabel>Email</InputLabel>
          <Input
            startAdornment={
              <EmailRoundedIcon
                sx={{ color: (theme) => theme.palette.icon.main }}
                />
              }
            placeholder="siriwatk@test.com"
            endAdornment={
            <VisibilitySelector
            value={visibilitySettings.email}
            onChange={(value) => handleVisibilityChange('email', value)}
            />
          }
        />
            </FormControl>

              <CountrySelector />

              <FormControl sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 0.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '4px',
                    padding: '8px',
                    minHeight: 56, // Mantén una altura consistente
                  }}
                >
                  {languages.map((language, index) => (
                    <Chip
                      key={index}
                      label={language}
                      onDelete={() => handleDelete(language)}
                      sx={{ margin: 0.5 }}
                    />
                  ))}
                  <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a language and press space or Enter"
                    variant="outlined"
                    sx={{ minWidth: 100, flex: 1, border: 'none', boxShadow: 'none' }}
                  />
                  <VisibilitySelector
                    value={visibilitySettings.languages}
                    onChange={(value) => handleVisibilityChange('languages', value)}
                  />
                </Box>
              </FormControl>
            </Stack>
          </Stack>

          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            <Button color="neutral" variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" sx={{ ml: 1 }}>
              Save
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ p: 2 }}>
          <Typography variant="subtitle1">Bio</Typography>
          <Divider sx={{ my: 1 }} />
          <Stack spacing={2}>
            <EditorToolbar />
            <TextField
              multiline
              minRows={4}
              variant="outlined"
              defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
            />
          </Stack>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button size="small" variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button size="small" variant="contained">
              Save
            </Button>
          </CardActions>
        </Card>

        {isFaceScanOpen && (
          <FaceScan
            open={isFaceScanOpen}
            onCapture={handleCapture}
            onClose={handleCloseFaceScan}
          />
        )}
      </Stack>
    </Box>
  );
}