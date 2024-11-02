import { Users } from '../db/mongoDB.js';

/**
 * Middleware to handle wildcard subdomains, including usernames with dots.
 * This extracts the full subdomain (username) and checks the database for matching usernames.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const wildcardsUsernames = (req, res, next) => {
  const hostname = req.hostname || req.headers['host'];  // Get the full hostname
  const baseDomain = 'cleaker.me'; // Replace with your actual base domain

  // Check if the hostname ends with the base domain
  if (hostname.endsWith(baseDomain)) {
    // Extract everything before `.cleaker.me` as the subdomain (username)
    const subdomain = hostname.slice(0, -(baseDomain.length + 1)); // +1 for the dot before the base domain

    if (subdomain && subdomain !== baseDomain) {
      // Check if the subdomain (username) exists in the database
      Users.findOne({ username: subdomain })
        .then(user => {
          if (user) {
            // If user exists, show the public profile
            res.send(`Public profile for ${user.username}`);
          } else {
            // If user does not exist, prompt to claim the username
            res.send('Username available. Claim it now!');
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          res.status(500).send('Server error');
        });
    } else {
      next(); // If no subdomain, continue to other routes
    }
  } else {
    next(); // If hostname does not match base domain, continue to other routes
  }
};

export default wildcardsUsernames;