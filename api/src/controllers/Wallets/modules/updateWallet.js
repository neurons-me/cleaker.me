// server/controllers/Wallets/modules/updateWallet.js
import { Users } from '../../../db/Schemas/UserSchema.js';

export const updateWallet = async (req, res) => {
  const { username, walletAddress } = req.params;
  const updates = req.body;

  try {
    const user = await Users.findOneAndUpdate(
      { username, 'wallets.address': walletAddress },
      { $set: { 'wallets.$': updates } },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.status(200).send({ message: 'Wallet updated', wallets: user.wallets });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update wallet', error: error.message });
  }
};