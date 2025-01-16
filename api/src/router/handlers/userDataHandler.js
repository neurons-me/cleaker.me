// server/routes/userDataHandler.js
import { Users } from '../../db/mongoDB.js';
import jwt from 'jsonwebtoken';

export const userDataHandler = async (req, res) => {
  const token = req.cookies.cleakerToken;
  if (!token) return res.status(401).send({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.id, { passwordHash: 0, encryptedPrivateKey: 0 }); // Exclude sensitive data

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Failed to authenticate token' });
  }
};