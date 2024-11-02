// VisibilitySelector.jsx
import React, { useState } from 'react';
import { IconButton, Popover, List, ListItem } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';

const VisibilitySelector = ({ value, onChange }) => {
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

  // Choose the icon based on the current visibility value
  const getVisibilityIcon = (visibility) => {
    switch (visibility) {
      case 'public':
        return <PublicIcon fontSize="small" />;
      case 'private':
        return <LockIcon fontSize="small" />;
      case 'friends':
        return <PeopleIcon fontSize="small" />;
      case 'group':
        return <GroupIcon fontSize="small" />;
      default:
        return <PublicIcon fontSize="small" />;
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        {getVisibilityIcon(value)}
      </IconButton>
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
          <ListItem
            onClick={() => handleSelect('public')}
            sx={{ cursor: 'pointer' }}
          >
            <PublicIcon fontSize="small" sx={{ mr: 1 }} /> Public
          </ListItem>
          <ListItem
            onClick={() => handleSelect('friends')}
            sx={{ cursor: 'pointer' }}
          >
            <PeopleIcon fontSize="small" sx={{ mr: 1 }} /> Friends Only
          </ListItem>
          <ListItem
            onClick={() => handleSelect('group')}
            sx={{ cursor: 'pointer' }}
          >
            <GroupIcon fontSize="small" sx={{ mr: 1 }} /> Group of Friends
          </ListItem>
          <ListItem
            onClick={() => handleSelect('private')}
            sx={{ cursor: 'pointer' }}
          >
            <LockIcon fontSize="small" sx={{ mr: 1 }} /> Private
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default VisibilitySelector;