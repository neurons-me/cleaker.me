// server/server.js
import dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import cors from 'cors';
import { connectDB } from './db/mongoDB.js';
import wildcardUsernames from './scripts/wildcardUsernames.js';
import router from './routes/index.js'; // Import the main router with all routes

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'https://lvh.me:3000', // Allow requests only from this origin
  credentials: true, // Allow credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(express.json());
connectDB();
app.use(wildcardUsernames);

// Apply main router to the root path
app.use('/', router); // This now handles /login, /signUp, etc.

// HTTPS Configuration
const httpsOptions = {
  key: fs.readFileSync('/Users/abellae/lvh.key'),
  cert: fs.readFileSync('/Users/abellae/lvh.crt'),
};

// Start HTTP and HTTPS Servers
const httpPort = 3001;
http.createServer(app).listen(httpPort, () => {
  console.log(`HTTP Server running at http://lvh.me:${httpPort}`);
});

const httpsPort = 3443;
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`HTTPS Server running at https://lvh.me:${httpsPort}`);
});