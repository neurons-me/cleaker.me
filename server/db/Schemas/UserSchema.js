// server/db/UserSchema.js
import mongoose from 'mongoose';
import SemanticSchema from './SemanticSchema.js';  // Import for complex relationships

// Define the WalletSchema
const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  label: { type: String, default: 'Main Wallet' },
  type: { type: String, default: 'Ethereum' }, // e.g., Ethereum, Bitcoin
  isDefault: { type: Boolean, default: false },
}, { _id: false });

// Define the UserSchema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  loginAttempts: { type: Number, default: 0 },
  lastAttempt: { type: Date, default: null },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  ethereumHash: { type: String },
  walletAddress: { type: String },
  encryptedPrivateKey: { type: String },
  verified_email: { type: Boolean, default: false },
  verification_token: { type: String },

  // Wallets array to store multiple wallets
  wallets: [WalletSchema],

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