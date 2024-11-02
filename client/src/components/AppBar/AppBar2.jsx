<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
<Box sx={{ display: 'flex', alignItems: 'center' }}>
  <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
    <MenuIcon />
  </IconButton>
  <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
    <img src="/assets/cleaker_logo_circular.png" alt="My App Logo" style={{ width: 34, height: 34, marginRight: 8 }} />
    <Typography variant="h6" component="div" color="text.primary">
      Cleaker.me
    </Typography>
  </Box>
</Box>

<Box sx={{ flexGrow: 1 }} />

<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
    <Badge badgeContent={4} color="error">
      <MailIcon />
    </Badge>
  </IconButton>
  <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
    <Badge badgeContent={17} color="error">
      <NotificationsIcon />
    </Badge>
  </IconButton>
  <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
    <AccountCircle />
  </IconButton>
</Box>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
  <IconButton color="inherit" aria-label="search" onClick={handleSearchClick}>
    <SearchIcon />
  </IconButton>
  <ColorModeIconDropdown />
</Box>

<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
  <IconButton
    size="large"
    aria-label="show more"
    aria-controls={mobileMenuId}
    aria-haspopup="true"
    onClick={handleMobileMenuOpen}
    color="inherit"
  >
    <MoreIcon />
  </IconButton>
</Box>
</Toolbar>