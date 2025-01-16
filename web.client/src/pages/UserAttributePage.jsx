// src/pages/UserAttributePage.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Toolbar, Typography, Button } from '@mui/material';

const UserAttributePage = ({ username, isLocalUser }) => {
  const { attributeType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no session exists and not in subdomain view
    if (!username && !isLocalUser) {
      navigate('/'); // Redirect to login or welcome page
      return;
    }

    console.log(
      isLocalUser
        ? `Viewing own '${attributeType}' attributes for ${username || 'Anonymous'}`
        : `Viewing '${attributeType}' attributes for another user ${username}`
    );
  }, [attributeType, isLocalUser, navigate, username]);

  if (!username) {
    // Display a message if there's no username and user is not logged in
    return (
      <div>
        <Toolbar />
        <Typography variant="h6" align="center" color="textSecondary" sx={{ mt: 2 }}>
          Please log in to view this information.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Toolbar /> {/* Spacer */}
      <h1>
        {isLocalUser
          ? `Your '${attributeType}' Attributes`
          : `${attributeType} Attributes for ${username}`}
      </h1>
      {/* Render the appropriate data here */}
    </div>
  );
};

export default UserAttributePage;