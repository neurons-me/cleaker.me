// EditorToolbar.jsx
import * as React from 'react';
import Box from '@mui/material/Box'; // Usa Box de Material UI
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

export default function EditorToolbar(props) {
  const { sx, ...other } = props;
  
  return (
    <Box
      {...other}
      sx={[
        { display: 'flex', gap: 0.5, '& > button': { fontSize: '16px' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Select
        size="small"
        defaultValue="1"
        sx={{ minWidth: 160 }}
        variant="outlined" // Puedes ajustarlo según el estilo deseado
      >
        <MenuItem value="1">Normal text</MenuItem>
        <MenuItem value="2" sx={{ fontFamily: 'monospace' }}> {/* 'monospace' para código */}
          Code text
        </MenuItem>
      </Select>
      
      <IconButton size="small">
        <FormatBoldRoundedIcon />
      </IconButton>
      <IconButton size="small">
        <FormatItalicRoundedIcon />
      </IconButton>
      <IconButton size="small">
        <StrikethroughSRoundedIcon />
      </IconButton>
      <IconButton size="small">
        <FormatListBulletedRoundedIcon />
      </IconButton>
    </Box>
  );
}