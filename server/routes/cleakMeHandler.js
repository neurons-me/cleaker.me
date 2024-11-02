import { Users } from '../db/mongoDB.js';
import bcrypt from 'bcrypt'; // Make sure bcrypt is installed

// Define the logic for login (cleak-me)
export async function cleakMe(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    let user = await Users.findOne({ username });

    if (!user) {
      console.log(`${username} not found`);
      return res.status(404).send({ message: 'Username not found' });
    }

    // If the user exists, check the password
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (passwordValid) {
      res.send({ message: 'Login successful! You are authenticated.' });
    } else {
      console.log('Invalid password for', username);
      res.status(401).send({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Server error during login.' });
  }
}