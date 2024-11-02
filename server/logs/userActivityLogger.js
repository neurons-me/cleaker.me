import winston from 'winston';
import path from 'path';

const userActivityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const logMessage = {
        timestamp,
        level,
        ...meta,  // Incluye campos personalizados (code, username, etc.)
        message,  // Mensaje del log
      };
      return JSON.stringify(logMessage);  // Salida en formato JSON
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join('logs', 'userActivity.log') }), // Un solo archivo de logs
    new winston.transports.Console({
      format: winston.format.printf(({ timestamp, code, level, message }) => {
        return `${timestamp} - ${code} - ${level}: ${message}`;
      }),
    }),
  ],
});

export default userActivityLogger;