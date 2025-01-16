// cleaker.me - server/server.js
import dotenvFlow from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { corsOptions } from './src/scripts/corsOptions.js';
import { connectDB } from './src/db/mongoDB.js';
import cleaker from 'cleaker';
import router from './src/router/routes.js'; // Import the main router with all routes
import chalk from 'chalk';
dotenvFlow.config({ path: './env' });

// Centralized environment variable checker
const checkEnvVariables = (requiredVars) => {
  const missingVars = requiredVars.filter((envVar) => !process.env[envVar]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

// Check required environment variables
try {
  checkEnvVariables(['JWT_SECRET', 'ENCRYPTION_SECRET']);
  console.log(chalk.green('Environment variables validated successfully.'));
} catch (error) {
  console.error(chalk.red(error.message));
  process.exit(1); // Exit the process if critical variables are missing
}

const app = express();
const port = process.env.PORT || 8383;

app.use(cors(corsOptions));
app.use(express.json());
// Use cleaker.me middleware for identity and context logging
app.use(
  cleaker.me({
    ledger: null, // ledger endpoint
    jwtCookieName: 'cleakerToken', // Name of the JWT cookie used for authentication
    requireAuth: false, // Set to true if authentication is required
  })
);

app.use('/', router);
console.log(`
  ┌─┐┬  ┌─┐┌─┐┬┌─┌─┐┬─┐ ┌┬┐┌─┐
  │  │  ├┤ ├─┤├┴┐├┤ ├┬┘ │││├┤ 
  └─┘┴─┘└─┘┴ ┴┴ ┴└─┘┴└─o┴ ┴└─┘
`);
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please free the port and try again.`);
    process.exit(1); // Exit the process to prevent hanging
  } else {
    console.error('Unexpected server error:', err);
    process.exit(1);
  }
});
// Connect to mongodb
connectDB().catch((err) => {
  console.error('Error connecting to the database:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err); // Log full error stack in non-production
  }
  process.exit(1); // Exit the process on failure
});