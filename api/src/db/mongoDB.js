import mongoose from 'mongoose';

// MongoDB Connection
export const connectDB = async () => {
  try {
    // Load and validate environment variables
    const mongoHost = process.env.MONGO_HOST || 'localhost';
    const mongoPort = process.env.MONGO_PORT || '27017'; // Default to 27017 if not set
    const mongoDB = process.env.MONGO_DB || 'cleaker';
    const mongoUser = process.env.MONGO_USER;
    const mongoPassword = process.env.MONGO_PASSWORD;

    if (!mongoUser || !mongoPassword) {
      throw new Error('MONGO_USER and MONGO_PASSWORD must be set in environment variables');
    }

    // Encode the password for URI
    const encodedPassword = encodeURIComponent(mongoPassword);

    // Construct MongoDB URI
    const uri = `mongodb://${mongoUser}:${encodedPassword}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;

    // Log connection details for debugging (avoid logging passwords in production)
    console.log('Connecting to MongoDB with config:', {
      mongoHost,
      mongoPort,
      mongoDB,
      mongoUser,
    });

    // Connect to MongoDB (no deprecated options)
    await mongoose.connect(uri, {
      dbName: mongoDB, // Set the database name explicitly
    });

    console.log('MongoDB connected successfully to:', mongoDB);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);

    // For non-production, log more details
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }

    process.exit(1); // Stop the application if the DB fails to connect
  }
};
