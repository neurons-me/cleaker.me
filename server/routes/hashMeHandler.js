import jwt from 'jsonwebtoken';
import Cleaker from 'cleaker'; 
import { Users } from '../db/mongoDB.js'; // Import your Users model
import userActivityLogger from '../logs/userActivityLogger.js'; // Import the logger

/**
 * Handler to create a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const hashMeHandler = async (req, res) => {
  const { username, email, password } = req.body;
  
    // Request Initiated
  userActivityLogger.info({
    code: 'USER_SIGNUP_002',
    message: `New user request initiated: ${username}`,
    username,
    email
  });

  // Validate the username and email
  try {
    Cleaker.validateEmail(email);
  } catch (error) {
    userActivityLogger.warn({
      code: 'USER_VALIDATION_002',
      message: `Validation error for ${username}: ${error.message}`,
      username,
      error: error.message,
    });
    return res.status(400).send({ message: error.message });
  }

  // Check if the password meets security requirements
  if (!Cleaker.passwordSecurityCheck(password)) {
    userActivityLogger.warn({
      code: 'USER_SIGNUP_004',
      message: `Password does not meet security requirements for ${username}`,
      username,
    });
    return res.status(400).send({
      message: 'Password does not meet security requirements. Must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.',
    });
  }

  // Check if the username or email is already taken
  let user = await Users.findOne({ $or: [{ username }, { email }] });
  if (user) {
    if (user.username === username) {
      userActivityLogger.warn({
        code: 'USER_SIGNUP_001',
        message: `Username already taken: ${username}`,
        username,
      });       
      return res.status(400).send({ message: 'Username already taken' });
    } else if (user.email === email) {
      userActivityLogger.warn({
        code: 'USER_SIGNUP_003',
        message: `Email already in use: ${email}`,
        email,
      });
      return res.status(400).send({ message: 'Email already in use' });
    }
  }

  try {
    // Generate a salt and hash the password
    const salt = Cleaker.salt(); 
    const passwordHash = await Cleaker.hashPassword(password, salt); 
    const ethereumHash = Cleaker({ username, password }, 'Keccak-256'); 

    const newUser = new Users({
      username,
      email,
      passwordHash,
      ethereumHash,
      salt, 
    });

    await newUser.save();

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      userActivityLogger.error({
        code: 'USER_SIGNUP_007',
        message: `JWT Secret not set for ${username}`,
        username,
        email,
      });
      return res.status(500).send({ message: 'Server configuration error. Please contact support.' });
    }

    // Generate token upon successful user creation
    const token = jwt.sign(
      { username, email }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    // Set token in an HTTP-only cookie
    res.cookie('cleakerToken', token, {
      httpOnly: true,
      secure: true,  // Only send over HTTPS
      domain: '.cleaker.me', // Set for all subdomains
      sameSite: 'Lax', // Controls cross-origin behavior
      maxAge: 3600000 // 1 hour
    });

    // Send a success message back to the client
    res.status(201).send({ message: 'User created successfully!' });

    userActivityLogger.info({
      code: 'USER_SIGNUP_006',
      message: 'User created successfully',
      username,
      email,
    });

  } catch (error) {
    userActivityLogger.error({
      code: 'USER_SIGNUP_007',
      message: `New User Creation Failed for ${username}: ${error.message}`,
      username,
      email,
      error: error.message,
    });
    res.status(500).send({ message: 'Failed to create user due to a server error.' });
  }
};

export default hashMeHandler;