// src/scripts/checkUserExists.js
import { Users } from '../db/Schemas/UserSchema.js';
/**
 * Checks if a user already exists by username or email.
 * @param {string} username - The username to check.
 * @param {string} email - The email to check.
 * @returns {Promise<object|null>} The existing user if found, or null.
 */
export const checkUserExists = async (username, email) => {
  return await Users.findOne({ $or: [{ username }, { email }] });
};