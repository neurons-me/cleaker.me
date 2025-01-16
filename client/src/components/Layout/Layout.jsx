import React from 'react';
import { Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import SideMenu from '../SideMenu/SideMenu'; // Import the side menu
import RightMenu from '../AppBar/RightMenu'; // Import the RightMenu

export default function Layout({ children }) {
  const isWide = useMediaQuery('(min-width:987px)'); // Wide screens (left, middle, right)
  const isIntermediate = useMediaQuery('(min-width:610px) and (max-width:986px)'); // Harmonic between 610px and 987px
/*Even though isSmall is not explicitly used here, it could serve the following purposes:
If you want to add specific styles or behaviors for small screens later, you can use isSmall for those conditions.*/
  const isSmall = useMediaQuery('(max-width:609px)'); // Small screens (only middle)
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: isWide
          ? '240px 1fr 240px' // Full layout with left, middle, and right sections
          : isIntermediate
          ? '240px 1fr' // Left and middle sections only
          : '1fr', // Only the middle section
        height: '100vh',
      }}
    >
      {/* Sidebar (Left Section) */}
      {(isWide || isIntermediate) && ( // Render left section for wide and intermediate screens
        <Box
          sx={{
            backgroundColor: 'background.default',
            borderRight: '1px solid',
            borderColor: 'divider',
            overflowY: 'auto',
          }}
        >
          <SideMenu />
        </Box>
      )}

      {/* Main Content (Middle Section) */}
      <Box sx={{ overflowY: 'auto', position: 'relative' }}>
        <CssBaseline />
        {/* Add padding to avoid content being hidden under the AppBar */}
        <Toolbar />
        <Box sx={{ p: 2 }}>{children}</Box>
      </Box>

      {/* Right Placeholder (Right Section) */}
      {isWide && ( // Render right section only for wide screens
        <Box
          sx={{
            backgroundColor: 'background.default',
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Empty for now */}
          <RightMenu /> {/* Add the RightMenu component */}
        </Box>
      )}
    </Box>
  );
}
