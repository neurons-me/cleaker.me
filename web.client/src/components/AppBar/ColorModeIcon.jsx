// src/components/ColorModeIcon.jsx
import React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useThemeToggle } from '../../themes/ThemeContext';

export default function ColorModeIcon() {
  const theme = useTheme();
  const toggleTheme = useThemeToggle();

  const icon = theme.palette.mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />;

  return (
    <IconButton onClick={toggleTheme} sx={{ color: theme.palette.icon.main }}>
      {icon}
    </IconButton>
  );
}