import mongoose from 'mongoose';

// MongoDB Connection
export const connectDB = async () => {
  try {
    const mongoHost = process.env.MONGO_HOST || 'localhost';
    const mongoPort = process.env.MONGO_PORT || '27017'; // Default to 27017 if not set
    const mongoDB = process.env.MONGO_DB || 'cleaker';
    const mongoUser = process.env.MONGO_USER;
    const mongoPassword = process.env.MONGO_PASSWORD;

    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST || '127.0.0.1'}:27017/${process.env.MONGO_DB}`;
    console.log('Connecting to MongoDB:', uri);    
    await mongoose.connect(uri, {
      dbName: mongoDB,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Stop the application if the DB fails to connect
  }
};