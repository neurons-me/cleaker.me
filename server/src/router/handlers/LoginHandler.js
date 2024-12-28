//cleaker.me/server/src/router/handlers/LoginHandler.js
import { Users } from '../../db/Schemas/UserSchema.js';
import cleaker from 'cleaker';
import { setAuthCookie } from '../../scripts/cookies.js';
import { LOGIN_CODES } from '../../logs/codes.js';
import loginActivityLogger from '../../logs/loginActivityLogger.js';
/*  the core of the 
╦  ┌─┐┌─┐  ╦┌┐┌
║  │ ││ ┬  ║│││
╩═╝└─┘└─┘  ╩┘└┘ process */
export async function loginHandler  (req, res) {
  const { username, password, loginAttempts: clientLoginAttempts } = req.body;
  const timestamp = new Date().toISOString();
  let serverLoginAttempts = 0; //keep track of login attempts to secure account.
  try {
    // Retrieve user data from the database
    const user = await Users.findOne({ username }); // the username is the user's primary identity.
     // Prepare the log entry template with initial values
     const logEntry = {
      timestamp,
      username,
      level: 'info',
      clientAttempts: clientLoginAttempts || 0,
      code: LOGIN_CODES.ATTEMPT,
      serverAttempts: user ? user.loginAttempts || 0 : null,
      ip: req.ip,
    };
    // If no username found log it server/logs/loginActivity.log and notify client.
    if (!user) {
      logEntry.level = 'warn';
      logEntry.code = LOGIN_CODES.USERNAME_NOT_FOUND;
      logEntry.message = `${username}`;
      loginActivityLogger.info(logEntry);
      return res.status(404).send({ 
        success: false,
        message: LOGIN_CODES.USERNAME_NOT_FOUND, // Informative error message for the client.
      });
    }
    /* Verify if the provided password matches the stored password hash
    `cleaker.verifyPassword()` takes three arguments:
    1. `password`: The plain text password provided by the user during login.
    2. `user.passwordHash`: The hashed password stored in the database for the user.
    3. `user.salt`: The salt used during the password hashing process.
    If the password is correct, it will return `true`. Otherwise, it will return `false`.*/
    const isPasswordValid = await cleaker.verifyPassword(password, user.passwordHash, user.salt);
    /* Retrieve the number of failed login attempts for the user from the database
    user.loginAttempts:
     - This is a field in the users MongoDB document that keeps track of how many
     failed login attempts the user has made.
     - MongoDB retrieves this field as part of the `user` object when the user is queried.
     If `user.loginAttempts` is `undefined` or `null` (e.g., no failed attempts recorded),
     it defaults to `0` using the `||` operator.*/
    serverLoginAttempts = user.loginAttempts || 0; //Why Use || 0?
    //The || 0 ensures that even if loginAttempts is undefined or null, serverLoginAttempts will default to 0.
    //This prevents errors and ensures you can safely increment serverLoginAttempts later without additional checks.
    /*   ___           ___              
     -  (O o)  -      (o o)           
    ooO--(_)--Ooo-ooO--(_)--Ooo-
    If Password is not Valid.*/
    if (!isPasswordValid) {
      serverLoginAttempts += 1; // Increment server-side login attempts
      // Update the database with the new login attempt count
      const updateResult = await Users.updateOne(
        { username },
        { $set: { loginAttempts: serverLoginAttempts, lastAttempt: Date.now() } }
      );//console.log(`Update result for user ${username}:`, updateResult); 
    // Check if the update was successful
    if (updateResult.modifiedCount === 0) {
      logEntry.level = 'error';
      logEntry.code = LOGIN_CODES.GENERAL_ERROR;
      logEntry.message = `Failed to update login attempts for ${username}`;
      loginActivityLogger.error(logEntry);
      return res.status(500).send({ 
        success: false,
        message: LOGIN_CODES.GENERAL_ERROR,
      });
    }
     // Update log entry for invalid password
     logEntry.level = 'warn';
     logEntry.code = LOGIN_CODES.INVALID_PASSWORD;
     logEntry.message = `Invalid password for ${username}`;
     logEntry.serverAttempts = serverLoginAttempts;
     loginActivityLogger.info(logEntry);
     return res.status(401).send({ 
       success: false,
       message: LOGIN_CODES.INVALID_PASSWORD,
     });
   }
  /*╔═╗╦ ╦╔═╗╔═╗╔═╗╔═╗╔═╗╔═╗╦ ╦╦  
    ╚═╗║ ║║  ║  ║╣ ╚═╗╚═╗╠╣ ║ ║║  
    ╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚  ╚═╝╩═╝Login
    After a successful login, the loginAttempts field in the user's MongoDB document is reset to 0,
    and lastAttempt is set to null.
    Why: This ensures that any previous failed login attempts are cleared,
    effectively "unlocking" the account and preparing it for future use without restrictions.*/
    await Users.updateOne({ username }, { $set: { loginAttempts: 0, lastAttempt: null } });
    // COOOOOKIES
    //Using .cleaker.me as the domain allows the cookie to be shared across all subdomains.
    setAuthCookie(res, { username: user.username, id: user._id }); // Set the JWT as a cookie
    // Update log entry for success
    logEntry.level = 'info';
    logEntry.code = LOGIN_CODES.SUCCESS;
    logEntry.message = `User ${username} successfully logged in at ${timestamp}.`;
    logEntry.serverAttempts = 0;
    loginActivityLogger.info(logEntry);
    res.status(200).send({ 
      message: LOGIN_CODES.SUCCESS,
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
      code: LOGIN_CODES.GENERAL_ERROR,
    });
    res.status(500).send({ message: LOGIN_CODES.GENERAL_ERROR });
  }
}