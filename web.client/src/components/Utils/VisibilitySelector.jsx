// VisibilitySelector.jsx
import React, { useState } from 'react';
import { IconButton, Popover, List, ListItem, Typography, Box } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';

const VisibilitySelector = ({ value, onChange, showLabel = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newValue) => {
    onChange(newValue);
    handleClose();
  };

  const open = Boolean(anchorEl);

  const getVisibilityIconAndLabel = (visibility) => {
    switch (visibility) {
      case 'public':
        return { icon: <PublicIcon fontSize="small" />, label: 'Public' };
      case 'private':
        return { icon: <LockIcon fontSize="small" />, label: 'Private' };
      case 'friends':
        return { icon: <PeopleIcon fontSize="small" />, label: 'Friends Only' };
      case 'group':
        return { icon: <GroupIcon fontSize="small" />, label: 'Group of Friends' };
      default:
        return { icon: <PublicIcon fontSize="small" />, label: 'Public' };
    }
  };

  const { icon, label } = getVisibilityIconAndLabel(value);

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={handleClick}
      >
        {showLabel && <Typography variant="body2" sx={{ mr: 1 }}>{label}</Typography>}
        <IconButton size="small">
          {icon}
        </IconButton>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          <ListItem onClick={() => handleSelect('public')} sx={{ cursor: 'pointer' }}>
            <PublicIcon fontSize="small" sx={{ mr: 1 }} /> Public
          </ListItem>
          <ListItem onClick={() => handleSelect('friends')} sx={{ cursor: 'pointer' }}>
            <PeopleIcon fontSize="small" sx={{ mr: 1 }} /> Friends Only
          </ListItem>
          <ListItem onClick={() => handleSelect('group')} sx={{ cursor: 'pointer' }}>
            <GroupIcon fontSize="small" sx={{ mr: 1 }} /> Group of Friends
          </ListItem>
          <ListItem onClick={() => handleSelect('private')} sx={{ cursor: 'pointer' }}>
            <LockIcon fontSize="small" sx={{ mr: 1 }} /> Private
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default VisibilitySelector;