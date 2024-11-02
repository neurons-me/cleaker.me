import dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { connectDB, Users } from './db/mongoDB.js';
import cors from 'cors';
import wildcardUsernames from './scripts/wildcardUsernames.js';
import profileViewHandler from './routes/profileViewHandler.js';
import { cleakMe } from './routes/cleakMeHandler.js';
import hashMeHandler from './routes/hashMeHandler.js';
import { verifyEmail } from './routes/verifyEmailHandler.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use(wildcardUsernames);

app.get('/user-profile/:username', profileViewHandler);
app.post('/cleak-me', cleakMe);
app.post('/hash-me', hashMeHandler);
app.get('/verify-email', verifyEmail);

// HTTPS options
const httpsOptions = {
    key: fs.readFileSync('/Users/abellae/lvh.key'),
    cert: fs.readFileSync('/Users/abellae/lvh.crt'),
};

// Start HTTP server
const httpPort = 3001;
http.createServer(app).listen(httpPort, () => {
  console.log(`HTTP Server running at http://lvh.me:${httpPort}`);
});

// Start HTTPS server
const httpsPort = 3443;
https.createServer(httpsOptions, app).listen(httpsPort, () => {
  console.log(`HTTPS Server running at https://lvh.me:${httpsPort}`);
});