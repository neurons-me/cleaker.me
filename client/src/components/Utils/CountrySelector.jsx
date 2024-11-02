import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import imlearning from 'i.mlearning'; // Adjust the path as needed

const { countries } = imlearning || {}; // Check if 'countries' exists

export default function CountrySelector(props) {
  const { sx, ...other } = props;

  // Check if countries data is loaded and structured correctly
  if (!Array.isArray(countries) || countries.length === 0) {
    console.warn('Country data is missing or not loaded correctly.');
    return null;
  }

  return (
    <Box
      {...other}
      sx={{ ...(Array.isArray(sx) ? sx : [sx]) }}
    >
      <Autocomplete
        size="small"
        autoHighlight
        getOptionLabel={(option) => option.label || ''}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        defaultValue={{ code: 'US', label: 'United States', phone: '1' }}
        options={countries}
        renderOption={(props, option) => (
          <Box component="li" {...props} display="flex" alignItems="center" gap={1}>
            <Avatar
              variant="rounded"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
              sx={{ width: 20, height: 20 }}
            />
            <Typography>{option.label}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
              (+{option.phone})
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
      />
    </Box>
  );
}