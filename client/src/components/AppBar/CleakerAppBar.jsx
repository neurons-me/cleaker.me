import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Avatar, Popover } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ColorModeIcon from './ColorModeIcon';
import SideMenuMobile from './SideMenuMobile';
import SearchComponent from '../Search/SearchComponent';
import MeCompact from '../Me/MeCompact';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'; // Icon for stickers/pins menu
import EmojiSelector from './EmojiSelector'; // Import EmojiSelector

export default function CleakerAppBar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [pinsMenuAnchorEl, setPinsMenuAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMeCompact, setShowMeCompact] = useState(false);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isEmojiSelectorOpen = Boolean(pinsMenuAnchorEl);

  const handleEmojiButtonClick = (event) => setPinsMenuAnchorEl(event.currentTarget);
  const handleEmojiClose = () => setPinsMenuAnchorEl(null);

  const handleEmojiSelect = (emoji) => {
    alert(`You selected: ${emoji}`); // Replace with your own action
    handleEmojiClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'background.nav', 
          boxShadow: 'none', 
          borderBottom: '1px solid', 
          borderColor: 'divider' 
        }}
      >
        <Toolbar sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          padding: '0 16px' 
        }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" aria-label="menu" onClick={() => setOpen(true)} sx={{ color: (theme) => theme.palette.icon.main }}>
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <Link to="https://cleaker.me/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img
                  src="/assets/cleaker_logo_circular.png"
                  alt="cleaker.me"
                  style={{ width: 34, height: 34, marginRight: 8 }}
                />
              </Link>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <IconButton aria-label="search" onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
                <IconButton size="large" aria-label="show 17 new notifications">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={() => setShowMeCompact(!showMeCompact)}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>.me</Avatar>
                </IconButton>
              </>
            ) : (
              <>
                <ColorModeIcon />
                <IconButton onClick={handleEmojiButtonClick}>
                  <EmojiEmotionsIcon sx={{ color: 'inherit' }} />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render Emoji Selector */}
      <Popover
        open={isEmojiSelectorOpen}
        anchorEl={pinsMenuAnchorEl}
        onClose={handleEmojiClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <EmojiSelector onSelect={handleEmojiSelect} />
      </Popover>

      {/* Add MeCompact below AppBar */}
      {showMeCompact && (
        <Box sx={{
          position: 'fixed',
          top: '64px', // Adjust this value based on AppBar height
          right: '16px',
          zIndex: 1201,
          bgcolor: 'background.paper',
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
        }}>
          <MeCompact />
        </Box>
      )}

      {/* Render mobile menu, search component, etc., below */}
      {isLoggedIn && (
        <>
          <SideMenuMobile open={open} toggleDrawer={setOpen} />
          <SearchComponent open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
      )}
    </Box>
  );
}