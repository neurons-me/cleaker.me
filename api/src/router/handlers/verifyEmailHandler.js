// controllers/verifyEmailHandler.js
import { Users } from '../../db/Schemas/UserSchema.js';

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    if (!token) {
      return res.status(400).send({ message: 'Missing verification token.' });
    }

    const user = await Users.findOne({ verification_token: token });

    if (!user) {
      return res.status(400).send({ message: 'Invalid token or user does not exist.' });
    }

    user.verified_email = true;
    user.verification_token = ''; // Clear token on successful verification
    await user.save();

    res.send({ message: 'Email successfully verified!' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).send({ message: 'Server error during email verification.' });
  }
}