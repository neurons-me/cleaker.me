// src/pages/UserAttributePage.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Toolbar
} from '@mui/material';

const UserAttributePage = ({ username, isLocalUser }) => {
  const { attributeType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: If you want to handle certain paths differently, you can still add logic here
    if (isLocalUser) {
      console.log(`Viewing own '${attributeType}' attributes for ${username}`);
    } else {
      console.log(`Viewing '${attributeType}' attributes for another user ${username}`);
    }
  }, [attributeType, isLocalUser, navigate, username]);

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