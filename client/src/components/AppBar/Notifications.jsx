import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationDropdown = ({ notifications }) => (
  <Box sx={{ p: 2, minWidth: 300 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Notifications
    </Typography>
    {notifications.length > 0 ? (
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index}>
            <ListItemText primary={notification} />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography variant="body2" color="text.secondary">
        No notifications
      </Typography>
    )}
  </Box>
);

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState(null);
  const notifications = []; // Replace with your notifications array

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        size="large"
        aria-label="show notifications"
        onClick={handleOpen}
      >
        <Badge
          badgeContent={notifications.length > 0 ? notifications.length : null}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
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
        <NotificationDropdown notifications={notifications} />
      </Popover>
    </>
  );
}
