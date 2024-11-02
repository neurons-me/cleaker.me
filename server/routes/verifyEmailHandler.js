import { Users } from '../db/mongoDB.js'; // Import the Users model

// Define the email verification logic
export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    // Find the user by verification token
    const user = await Users.findOne({ verification_token: token });

    if (!user) {
      return res.status(400).send({ message: 'Invalid token or user does not exist.' });
    }

    // Mark email as verified and clear the verification token
    user.verified_email = true;
    user.verification_token = ''; // Clear the token after successful verification
    await user.save();

    res.send({ message: 'Email successfully verified!' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).send({ message: 'Server error during email verification.' });
  }
}