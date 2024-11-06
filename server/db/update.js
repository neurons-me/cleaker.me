// server/db/update.js
import { connectDB, Users } from './mongoDB.js'; // Import database connection and Users model

// Ensure the connection to MongoDB
await connectDB();

try {
  // Update all existing users to have loginAttempts = 0 and lastAttempt = null if missing
  const result = await Users.updateMany(
    {},
    { $set: { loginAttempts: 0, lastAttempt: null } }
  );
  console.log('Update result:', result);
} catch (error) {
  console.error('Error updating users:', error.message);
}