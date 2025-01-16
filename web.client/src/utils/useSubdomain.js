// src/utils/useSubdomain.js
// Utility hook to determine subdomain and whether the user is on the main view
export const useSubdomain = () => {
    // Determine the base domain based on environment or default to cleaker.me
    const baseDomain =
      import.meta.env.VITE_BASE_DOMAIN ||
      (window.location.hostname.includes('localhost') ? 'localhost' : 'cleaker.me');
    const hostname = window.location.hostname;
    // Extract subdomain by removing the base domain from the hostname
    const subdomain = hostname.replace(`.${baseDomain}`, '');
    // Check if the current view is the main domain or a subdomain
    const isMainView = !subdomain || subdomain === 'www';
    return { subdomain, isMainView };
  };
  