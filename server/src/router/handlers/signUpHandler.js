//cleaker.me/server/src/router/handlers/signUpHandler.js
import { ethers } from 'ethers';
import cleaker from 'cleaker'; 
import CryptoJS from 'crypto-js';
import { Users } from '../../db/Schemas/UserSchema.js';
import { SIGNUP_CODES } from '../../logs/codes.js';
import userActivityLogger from '../../logs/userActivityLogger.js';
import { checkUserExists } from '../../scripts/checkUserExists.js';
import { setAuthCookie } from '../../scripts/cookies.js';
import { v4 as uuidv4 } from 'uuid';
/*coded by sui.gn with the help of my bff chatGPT*/
export const signUpHandler = async (req, res) => {
  const { username, email, password } = req.body;
  // Logs stored on cleaker.me/logs/userActivity.log
  userActivityLogger.info({
    code: SIGNUP_CODES.REQUEST_INITIATED,
    username,
    email,
  });
  try {
    // Validate username
    try {
      cleaker.validateUsername(username);
    } catch (error) {
      userActivityLogger.error({
        code: SIGNUP_CODES.INVALID_USERNAME,
        username,
        email
      });
      return res.status(400).send({
        success: false,
        message: 'Invalid username. It must follow the rules: 5-21 characters, only letters, numbers, up to 2 periods (not consecutive), and cannot start/end with a period or underscore.',
      });
    }
    // Validate email
    try {
      cleaker.validateEmail(email);
    } catch (error) {
      userActivityLogger.error({
        code: SIGNUP_CODES.INVALID_EMAIL,
        username,
        email,
      });
      return res.status(400).send({
        success: false,
        message: SIGNUP_CODES.INVALID_EMAIL,
      });
    }
    // Validate password
    if (!cleaker.passwordSecurityCheck(password)) {
      userActivityLogger.error({
        code: SIGNUP_CODES.PASSWORD_WEAK,
        username,
        email,
      });
      return res.status(400).send({
        success: false,
        message: SIGNUP_CODES.PASSWORD_WEAK,
      });
    }
    // Query DB for requested user to see if it already exists
    let user = await checkUserExists(username, email);
    if (user) {
      userActivityLogger.error({
        code: SIGNUP_CODES.EMAIL_OR_USERNAME_TAKEN,
        username,
        email,
      });
      return res.status(400).send({
        success: false, 
        message: SIGNUP_CODES.EMAIL_OR_USERNAME_TAKEN,
      });
    }
  const salt = cleaker.salt(); 
  const passwordHash = await cleaker.hashPassword(password, salt); 
  /*  Role of Ethereum Hash:
  The Ethereum hash serves as a unique identifier related to the user. 
  It's critical for associating wallets or dApp interactions with the Cleaker identity.
  The secret key is only used as part of the input to create randomness and ensure the hash is unique and secure.
  Once the hash is generated, it's stored in the database. 
  The input components (username, salt, and the server secret) are no longer needed.*/
  // Securely generate the Ethereum hash
  const derivedHashInput = `${username}:${salt}:${process.env.SERVER_SECRET}`;
  const ethereumHash = cleaker.hash(derivedHashInput, 'Keccak-256', 1000);
  // Generate Ethereum Wallet
  /*  Users might want to create multiple wallets under their identity. 
  The Ethereum hash needs to remain static to tie all wallets to a single Cleaker identity.*/
  //The wallet generated in this step is essentially a default or factory wallet.
  const wallet = ethers.Wallet.createRandom();
  const walletAddress = wallet.address;
  const encryptedPrivateKey = CryptoJS.AES.encrypt(wallet.privateKey, process.env.ENCRYPTION_SECRET).toString();
  /*  Why the Static Ethereum Hash Works:
  Immutable User Identity:
  The Ethereum hash acts as a core identifier for the user within Cleaker's system.
  It remains static even as wallets are added, removed, or replaced,
   maintaining consistency across all interactions.
  - Wallet Independence:
  Since the Ethereum hash is independent of any wallet, users can safely disregard or 
  replace compromised wallets without affecting their primary identity.
  - Secure Generation:
  By deriving the Ethereum hash with a salt, server-side secret, and secure algorithms, 
  it’s protected from reverse engineering or misuse.*/
  /*  Summary:
  The static Ethereum hash is not a security risk because it is abstracted from sensitive user data.
  It serves as the backbone of Cleaker's identity system, ensuring consistency and flexibility for wallet management.
  Wallets can be freely created, invalidated, or replaced, 
  with the hash remaining the user's immutable "digital fingerprint."
  By designing it this way, Cleaker achieves a secure, scalable, 
  and user-friendly system that empowers decentralized identity without compromise. */
// Create and save the user
const newUser = new Users({
  userId: uuidv4(), // Generate a unique user ID
  username,         // Username provided during signup
  email,            // Email address provided
  passwordHash,     // Securely hashed user password
  ethereumHash,     // Unique Ethereum hash tied to the user
  salt,             // Salt used for hashing
  walletAddress,    // Default Ethereum wallet address generated
  encryptedPrivateKey, // Encrypted private key of the wallet
});
await newUser.save(); // Save the user details to the database
// Cookie for the domain `.cleaker.me`
setAuthCookie(res, { userId: newUser.userId, username, email }); // Set the JWT as a cookie
// Log the successful signup event on cleaker.me/logs/userActivity.log
userActivityLogger.info({
  code: SIGNUP_CODES.SUCCESS, 
  userId: newUser.userId,  // Log userId for traceability
  username,  // Log username for traceability
  email,     // Log email for traceability
});
// Respond to the client indicating successful signup
res.status(201).send({
  success: true, 
  message: SIGNUP_CODES.SUCCESS,
  userId: newUser.userId, // Optional, based on client needs
});
// Handle errors gracefully, logging details for debugging
} catch (error) {
  // Log the error for debugging
  userActivityLogger.error({
    code: SIGNUP_CODES.FAILURE,   // Error code 
    message: `User creation failed: ${error.message}`, // Detailed log message
    username,                     // Include username for context
    email,                        // Include email for context
    stack: error.stack,           // Optional: Include stack trace for deeper debugging
  });
  // Send a user-friendly response
  return res.status(500).send({
    success: false,               // Indicates operation failure
    message: 'Failed to create user due to server error.', // User-friendly message
  });
}
};

export default signUpHandler;