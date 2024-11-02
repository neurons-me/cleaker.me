import nodemailer from 'nodemailer';

// Function to send the verification email
export async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services or custom SMTP
    auth: {
      user: 'admin@neurons.me',  // Replace with your email
      pass: 'b@Ch1685!!Orwell1984!!this.admin',   // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'admin@neurons.me',
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