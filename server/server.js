// server/server.js
import dotenvFlow from 'dotenv-flow';
import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import cors from 'cors';
import { connectDB } from './db/mongoDB.js';
import wildcardUsernames from './scripts/wildcardUsernames.js';
import router from './router/routes.js'; // Import the main router with all routes
import chalk from 'chalk';

dotenvFlow.config({ path: './env' });
const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS || 'https://lvh.me:3000', // Use environment variable if available
  credentials: true, // Allow credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(express.json());
connectDB();
app.use(wildcardUsernames);

// Apply main router to the root path
app.use('/', router); // This now handles /login, /signUp, etc.

// Environment Variables Logging
console.log(`
  Starting server in ${chalk.blue(process.env.NODE_ENV || 'development')} mode...
  ┌─┐┬  ┌─┐┌─┐┬┌─┌─┐┬─┐ ┌┬┐┌─┐
  │  │  ├┤ ├─┤├┴┐├┤ ├┬┘ │││├┤ 
  └─┘┴─┘└─┘┴ ┴┴ ┴└─┘┴└─o┴ ┴└─┘
  Environment Variables:
  - NODE_ENV: ${chalk.green(process.env.NODE_ENV || chalk.keyword('orange')('Not set'))}
  - MONGO_USER: ${process.env.MONGO_USER ? chalk.green(process.env.MONGO_USER) : chalk.keyword('orange')('Not set')}
  - MONGO_HOST: ${process.env.MONGO_HOST ? chalk.green(process.env.MONGO_HOST) : chalk.keyword('orange')('Not set')}
  - MONGO_DB: ${process.env.MONGO_DB ? chalk.green(process.env.MONGO_DB) : chalk.keyword('orange')('Not set')}
  - MONGO_PASSWORD: ${process.env.MONGO_PASSWORD ? chalk.green('Set') : chalk.keyword('orange')('Not set')}
  - PORT: ${process.env.PORT ? chalk.green(process.env.PORT) : chalk.keyword('orange')('Not set')}
  - CORS_ALLOWED_ORIGINS: ${process.env.CORS_ALLOWED_ORIGINS ? chalk.green(process.env.CORS_ALLOWED_ORIGINS) : chalk.keyword('orange')('Not set')}
  - JWT_SECRET: ${process.env.JWT_SECRET ? chalk.green('Set') : chalk.keyword('orange')('Not set')}
  - ENCRYPTION_SECRET: ${process.env.ENCRYPTION_SECRET ? chalk.green('Set') : chalk.keyword('orange')('Not set')}
`);

const httpPort = process.env.HTTP_PORT || 3001;
const httpsPort = process.env.HTTPS_PORT || 3443;
const useHttps = process.env.USE_HTTPS === 'true';

// Start HTTP Server
http.createServer(app).listen(httpPort, () => {
  console.log(`HTTP Server running at http://lvh.me:${httpPort}`);
});

// Conditionally start HTTPS server
if (useHttps) {
  const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };

  https.createServer(httpsOptions, app).listen(httpsPort, () => {
    console.log(`HTTPS Server running at https://lvh.me:${httpsPort}`);
  });
} else {
  console.log('HTTPS Server not started as USE_HTTPS is set to false.');
}