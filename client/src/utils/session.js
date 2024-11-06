// src/utils/session.js
export const isSessionActive = () => {
  const token = document.cookie
    .split('; ')
    .find((item) => item.startsWith('cleakerToken='));
  return Boolean(token);
};

export const getSessionUser = () => {
  const userData = sessionStorage.getItem('userData'); // Retrieve user data from session storage
  return userData ? JSON.parse(userData) : null;
};