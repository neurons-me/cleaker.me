import mongoose from 'mongoose';

// MongoDB Connection
export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cleaker'); // Database name
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Stop the application if the DB fails to connect
  }
};