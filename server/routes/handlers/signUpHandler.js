import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';
import Cleaker from 'cleaker'; 
import CryptoJS from 'crypto-js';
import { Users } from '../../db/Schemas/UserSchema.js';
import userActivityLogger from '../../logs/userActivityLogger.js';

export const signUpHandler = async (req, res) => {
  const { username, email, password } = req.body;

  userActivityLogger.info({
    code: 'USER_SIGNUP_002',
    message: `New user request initiated: ${username}`,
    username,
    email
  });

  try {
    Cleaker.validateEmail(email);

    if (!Cleaker.passwordSecurityCheck(password)) {
      return res.status(400).send({
        message: 'Password does not meet security requirements.',
      });
    }

    let user = await Users.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).send({ message: 'Username or email already taken' });
    }

    const salt = Cleaker.salt(); 
    const passwordHash = await Cleaker.hashPassword(password, salt); 
    const ethereumHash = Cleaker({ username, password }, 'Keccak-256'); 

    // Generate Ethereum Wallet
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;
    const encryptedPrivateKey = CryptoJS.AES.encrypt(wallet.privateKey, process.env.ENCRYPTION_SECRET).toString();

    // Create and save the user
    const newUser = new Users({
      username,
      email,
      passwordHash,
      ethereumHash,
      salt, 
      walletAddress, 
      encryptedPrivateKey,
    });

    await newUser.save();

    if (!process.env.JWT_SECRET) {
      return res.status(500).send({ message: 'Server configuration error.' });
    }

    const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('cleakerToken', token, {
      httpOnly: true,
      secure: true,
      domain: '.cleaker.me',
      sameSite: 'Lax',
      maxAge: 3600000
    });

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
      message: `User creation failed: ${error.message}`,
      username,
      email,
      error: error.message,
    });
    res.status(500).send({ message: 'Failed to create user due to server error.' });
  }
};

export default signUpHandler;