// src/logs/loginActivityLogger.js
import winston from 'winston';
import path from 'path';

const loginActivityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const logMessage = {
        timestamp,
        level,
        ...meta,
        message,
      };
      return JSON.stringify(logMessage);
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join('logs', 'loginActivity.log') }), // Dedicated login log file
    new winston.transports.Console({
      format: winston.format.printf(({ timestamp, code, level, message }) => {
        return `${timestamp} - ${code} - ${level}: ${message}`;
      }),
    }),
  ],
});

export default loginActivityLogger;