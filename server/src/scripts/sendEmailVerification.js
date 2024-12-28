// server/scripts/sendEmailVerification.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Loads environment variables from your .env file

export async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Can be other email services or custom SMTP
    auth: {
      user: process.env.EMAIL_USER,  // Environment variable for email
      pass: process.env.EMAIL_PASS,  // Environment variable for email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Click the link to verify your email: http://localhost:3001/verify-email?token=${token}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}