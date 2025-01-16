import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Popover,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Notifications from './Notifications'; // Adjust the path as necessary
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SideMenuMobile from './SideMenuMobile'; // Keep SideMenuMobile for mobile handling
import SearchComponent from '../Search/SearchComponent';
import MeCompact from '../Me/MeCompact';
import EmojiSelector from './EmojiSelector';
import CleakerLogo from '../CleakerLogo/CleakerLogo';

export default function CleakerAppBar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [showMeCompact, setShowMeCompact] = useState(false);
  const meCompactRef = useRef(); // Reference for MeCompact
  const navigate = useNavigate();
  const [pinsMenuAnchorEl, setPinsMenuAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSideMenuMobile, setOpenSideMenuMobile] = useState(false); // Manage mobile side menu visibility
  const isMobile = useMediaQuery('(max-width:987px)'); // Check screen size

  // Emoji Selector Handlers
  const handleEmojiButtonClick = (event) => setPinsMenuAnchorEl(event.currentTarget);
  const handleEmojiClose = () => setPinsMenuAnchorEl(null);

  // Logout Handler
  const handleLogout = () => {
    logout(() => {
      navigate('/'); // Redirect after logout
      setShowMeCompact(false); // Close dropdown
    });
  };

  // Handle outside click to close MeCompact
    const handleClickOutside = (event) => {
      if (meCompactRef.current && !meCompactRef.current.contains(event.target)) {
        setShowMeCompact(false);
      }
    };

  // Handle Mobile Side Menu toggle
  const handleToggleSideMenuMobile = () => {
    setOpenSideMenuMobile(!openSideMenuMobile);
  };

  useEffect(() => {
    if (showMeCompact) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMeCompact]);

  return (
    <Box sx={{ flexGrow: 1 }}>
     <AppBar
       position="fixed"
        sx={{
        backgroundColor: 'background.nav',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        height: '64px', // Explicit height for the AppBar
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it stays above any side drawer
        }}
        >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Mobile Menu Icon */}
            {isLoggedIn && isMobile && (
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={handleToggleSideMenuMobile}
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <Link
                to="https://cleaker.me/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <img
                  src="/assets/cleaker_logo_circular.png"
                  alt="cleaker.me"
                  style={{ width: 34, height: 34, marginRight: 8 }}
                />
              </Link>
            </Box>
          </Box>

          {/* Logged-In Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <IconButton aria-label="search" onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
                <IconButton onClick={handleEmojiButtonClick}>
                  <EmojiEmotionsIcon sx={{ color: 'inherit' }} />
                </IconButton>
                <Notifications />
                <IconButton onClick={() => setShowMeCompact(!showMeCompact)}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>.me</Avatar>
                </IconButton>
              </>
            ) : (
              <>
                <CleakerLogo />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Popovers */}
      <Popover
        open={Boolean(pinsMenuAnchorEl)}
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
        <EmojiSelector />
      </Popover>

      {showMeCompact && (
           <Box
           ref={meCompactRef} // Attach ref for outside click detection
           sx={{
             position: 'fixed',
             top: '64px',
             right: '16px',
             zIndex: 1201,
             bgcolor: 'background.paper',
             boxShadow: 3,
             borderRadius: 2,
             p: 2,
           }}
         >
           <MeCompact profile={user} onLogout={handleLogout} />
         </Box>
      )}

      {/* Mobile Side Menu */}
      {isLoggedIn && isMobile && (
        <SideMenuMobile
          open={openSideMenuMobile}
          toggleDrawer={(isOpen) => setOpenSideMenuMobile(isOpen)}
        />
      )}

      {/* Search */}
      {searchOpen && (
        <SearchComponent
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </Box>
  );
}
