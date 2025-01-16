/**
 * Dynamic CORS configuration to allow all subdomains of cleaker.me and a list of other domains.
 * 
 * This utility defines the allowed origins for CORS and validates requests dynamically.
 * It is used to configure CORS middleware in Express applications.
 *
 * @type {import('cors').CorsOptions}
 */
export const corsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = [
        /^https:\/\/cleaker\.me$/,          // Main domain
        /^https:\/\/.*\.cleaker\.me$/,      // Subdomains of cleaker.me
      ];
  
      if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
        callback(null, true); // Allow the request
      } else {
        console.error(`Blocked by CORS: ${origin}`); // Log blocked origins
        callback(new Error('Not allowed by CORS')); // Deny the request
      }
    },
    credentials: true, // Allow credentials to be sent in cross-origin requests
  };
  