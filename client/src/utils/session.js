// utils/session.js
export const isSessionActive = () => {
  const token = document.cookie
    .split('; ')
    .find((item) => item.startsWith('cleakerToken='));

  return Boolean(token);
};