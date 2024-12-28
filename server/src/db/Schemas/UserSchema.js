// server/db/UserSchema.js
import mongoose from 'mongoose';
import SemanticSchema from './SemanticSchema.js';
import { v4 as uuidv4 } from 'uuid';
// Define the UserSchema
const UserSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    unique: true, 
    default: uuidv4, // Automatically generate a UUID for each new user 
    required: true 
  },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  loginAttempts: { type: Number, default: 0 },
  lastAttempt: { type: Date, default: null },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  ethereumHash: { type: String },
  encryptedPrivateKey: { type: String },
  verified_email: { type: Boolean, default: false },
  verification_token: { type: String },
  // Reference to multiple wallets
  wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallets' }],
  // Other fields for `.me` functionality, semantics, and language
  be: { type: Map, of: String },
  do: { type: Map, of: String },
  have: { type: Map, of: String },
  semantics: { type: Map, of: SemanticSchema },
  language: {
    characters: { type: Map, of: Object, default: {} },
    words: { type: Map, of: Object, default: {} },
    phrases: { type: Map, of: Object, default: {} },
    fullLanguage: { type: String, default: null },
  },
  relationships: [SemanticSchema],
});

export const Users = mongoose.model('Users', UserSchema);