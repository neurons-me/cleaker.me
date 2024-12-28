//server/src/scripts/cookis.js
import jwt from 'jsonwebtoken';
/*
  Sets the authentication cookie with provided token and options.
      ,-.           
    _(*_*)_
   (_  o  _)
     / o \
    (_/ \_)
  We get to remember.
 */
  export const setAuthCookie = (res, payload, options = {}) => {
    // Default JWT and cookie options
    const jwtOptions = {
      expiresIn: options.jwtExpiresIn || '8h', // Default: 8 hours
    };
  
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      domain: process.env.COOKIE_DOMAIN || '.cleaker.me',
      sameSite: 'Lax',
      maxAge: options.cookieMaxAge || 8 * 3600000, // Default: 8 hours
    };
  
    // Generate JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
  
    // Set the cookie
    res.cookie('cleakerToken', token, cookieOptions);
  };
  
  /**
   * Verifies a JWT token from the cookie.
   *
   * @param {string} token - JWT token to verify.
   * @returns {Object} Decoded payload if valid, throws error if invalid.
   */
  export const verifyAuthCookie = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  };