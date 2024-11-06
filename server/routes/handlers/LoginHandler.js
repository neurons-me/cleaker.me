import jwt from 'jsonwebtoken';
import { Users } from '../../db/Schemas/UserSchema.js';
import Cleaker from 'cleaker';
import loginActivityLogger from '../../logs/loginActivityLogger.js';

export async function loginHandler(req, res) {
  const { username, password, loginAttempts: clientLoginAttempts } = req.body;
  const timestamp = new Date().toISOString();
  let serverLoginAttempts = 0;

  try {
    // Retrieve user data from the database
    const user = await Users.findOne({ username });

    // Prepare the log entry template with initial values
    const logEntry = {
      timestamp,
      username,
      clientAttempts: clientLoginAttempts || 0,
      message: 'Login attempt',
      level: 'info',
      code: 'LOGIN_ATTEMPT',
      serverAttempts: user ? user.loginAttempts || 0 : null,
      status: 'INITIATED',
    };

    if (!user) {
      logEntry.level = 'warn';
      logEntry.status = 'USER_NOT_FOUND';
      logEntry.message = `Username not found: ${username}`;
      loginActivityLogger.info(logEntry);
      return res.status(404).send({ message: 'Username not found' });
    }

    const isPasswordValid = await Cleaker.verifyPassword(password, user.passwordHash, user.salt);
    serverLoginAttempts = user.loginAttempts || 0;

    if (!isPasswordValid) {
      // Increment server-side login attempts
      serverLoginAttempts += 1;

      // Update the database with the new login attempt count
      const updateResult = await Users.updateOne(
        { username },
        { $set: { loginAttempts: serverLoginAttempts, lastAttempt: Date.now() } }
      );

      // Debug the update result
      console.log(`Update result for user ${username}:`, updateResult);
      
      // Check if the update was successful
      if (updateResult.modifiedCount === 0) {
        logEntry.level = 'error';
        logEntry.status = 'UPDATE_FAILED';
        logEntry.message = `Failed to update login attempts for ${username}`;
        loginActivityLogger.error(logEntry);
        return res.status(500).send({ message: 'Failed to update login attempts.' });
      }

      // Update log entry for invalid password
      logEntry.level = 'warn';
      logEntry.status = 'INVALID_PASSWORD';
      logEntry.message = `Invalid password for ${username}`;
      logEntry.serverAttempts = serverLoginAttempts;

      loginActivityLogger.info(logEntry);
      return res.status(401).send({ message: 'Invalid password' });
    }

    // Successful login, reset login attempts
    await Users.updateOne({ username }, { $set: { loginAttempts: 0, lastAttempt: null } });

    const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('cleakerToken', token, {
      httpOnly: true,
      secure: true,
      domain: '.cleaker.me',
      sameSite: 'Lax',
      maxAge: 3600000,
    });

    // Update log entry for success
    logEntry.status = 'LOGIN_SUCCESS';
    logEntry.serverAttempts = 0;
    logEntry.message = `User ${username} logged in successfully`;

    loginActivityLogger.info(logEntry);
    res.status(200).send({ 
      message: 'Login successful! auth:',
      token, 
      username: user.username,
      email: user.email, // Include email if desired
    });

  } catch (error) {
    loginActivityLogger.error({
      timestamp,
      username,
      clientAttempts: clientLoginAttempts || 0,
      serverAttempts: serverLoginAttempts,
      message: `Error during login for ${username}: ${error.message}`,
      status: 'ERROR',
      code: 'LOGIN_ERROR',
    });
    res.status(500).send({ message: 'Server error during login.' });
  }
}