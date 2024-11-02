import mongoose from 'mongoose';

// MongoDB Connection
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cleaker'); // No options needed here
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Stop the application if the DB fails to connect
  }
};

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },  // Add salt to the schema
  ethereumHash: { type: String },
  verified_email: { type: Boolean, default: false },
  verification_token: { type: String },
});

// Export the User model
export const Users = mongoose.model('Users', UserSchema);