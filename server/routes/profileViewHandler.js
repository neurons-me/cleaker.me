import { Users } from '../db/mongoDB.js'; // Import your Users model
import userActivityLogger from '../logs/userActivityLogger.js'; // Import the logger

/**
 * Handler to fetch and log profile views.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const profileViewHandler = (req, res) => {
  const { username } = req.params;
  
  // Log the profile view request
  userActivityLogger.info({
    code: 'PROFILE_VIEW_001',
    message: `Profile view request for ${username}`,
    username
  });
  
  Users.findOne({ username })
    .then(user => {
      if (user) {
        // Log successful profile fetch
        userActivityLogger.info({
          code: 'PROFILE_VIEW_002',
          message: `Profile successfully retrieved for ${username}`,
          username
        });
        res.json(user); // Send user data to the frontend
      } else {
        // Log if the user was not found
        userActivityLogger.warn({
          code: 'PROFILE_VIEW_003',
          message: `User not found for ${username}`,
          username
        });
        res.status(404).send('User not found');
      }
    })
    .catch(error => {
      // Log any server errors that occur
      userActivityLogger.error({
        code: 'PROFILE_VIEW_004',
        message: `Error fetching profile for ${username}: ${error.message}`,
        username,
        error: error.message
      });
      res.status(500).send('Server error');
    });
};

export default profileViewHandler;