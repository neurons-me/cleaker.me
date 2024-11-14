// server/db/WalletSchema.js
import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  address: { type: String, required: true },
  label: { type: String, default: 'Main Wallet' },
  type: { type: String, default: 'Ethereum' }, // e.g., Ethereum, Bitcoin
  isDefault: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // Reference to the user
});

export const Wallets = mongoose.model('Wallets', WalletSchema);