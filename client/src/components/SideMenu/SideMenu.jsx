//cleaker.me/client/src/components/AppBar/SideMenu,jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
const drawerWidth = 240;
const appBarHeight = 64;
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    backgroundColor: 'background.nav', // Ensure it matches AppBar
    boxSizing: 'border-box',
    marginTop: appBarHeight + 1, // 1px margin for AppBar border
  },
}));

export default function SideMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <StyledDrawer variant="permanent">
      <Stack
        sx={{
          height: `calc(100vh - ${appBarHeight}px)`,
          paddingTop: 2,
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1, alignItems: 'center' }}>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <CardAlert />
       
      </Stack>
    </StyledDrawer>
  );
}
