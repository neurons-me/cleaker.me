// src/components/AppBar/CleakerAppBar.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Menu, MenuItem } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ColorModeIcon from './ColorModeIcon';
import SideMenuMobile from './SideMenuMobile';
import SearchComponent from '../Search/SearchComponent';
import MeCompact from '../Me/MeCompact';
import Avatar from '@mui/material/Avatar';

export default function CleakerAppBar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMeCompact, setShowMeCompact] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = (route) => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    if (route) navigate(route);
  };
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleSearchClick = () => setSearchOpen(true);
  const handleSearchClose = () => setSearchOpen(false);
  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  // Pure opacity fade-in animation
  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 955 },
  });

  // Define the desktop menu
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={() => handleMenuClose()}
    >
      <MenuItem onClick={() => handleMenuClose("/me")}>Channel</MenuItem>
      <MenuItem onClick={() => handleMenuClose("/me")}>.me</MenuItem>
      <MenuItem onClick={() => handleMenuClose()}>Privacy & Settings</MenuItem>
      <MenuItem onClick={() => handleMenuClose("/me")}>Log Out</MenuItem>
    </Menu>
  );

  // Define the mobile menu
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
  
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <ColorModeIcon />
        <p>Dark Mode</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Apply opacity-based fade-in animation */}
      <animated.div style={springProps}>
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
              <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)} sx={{ color: (theme) => theme.palette.icon.main }}>
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
    <IconButton aria-label="search" onClick={handleSearchClick}>
      <SearchIcon />
    </IconButton>
    <IconButton size="large" aria-label="show 17 new notifications">
      <Badge badgeContent={17} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <IconButton onClick={() => setShowMeCompact(!showMeCompact)}>
      <Avatar sm={{ bgcolor: 'primary.main' }}>.me</Avatar>
    </IconButton>
  </>
) : (
  <ColorModeIcon />
)}
            </Box>
          </Toolbar>
        </AppBar>
      </animated.div>

 {/* Add MeCompact below AppBar based on showMeCompact state */}
 {showMeCompact && (
    <Box sx={{
      position: 'fixed',
      top: '64px', // Adjust this value based on AppBar height
      right: '16px',
      zIndex: 1201, // Ensure it appears above other components
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
      {renderMobileMenu}
      {renderMenu}
      <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
      <SearchComponent open={searchOpen} onClose={handleSearchClose} />
    </>
  )}
</Box>
  );
}