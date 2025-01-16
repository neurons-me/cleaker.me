// server/controllers/Wallets/modules/setDefaultWallet.js
import { Users } from '../../../db/Schemas/UserSchema.js';

export const setDefaultWallet = async (req, res) => {
  const { username } = req.params;
  const { address } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) return res.status(404).send({ message: 'User not found' });

    user.wallets = user.wallets.map(wallet => ({
      ...wallet,
      isDefault: wallet.address === address,
    }));
    await user.save();
    res.status(200).send({ message: 'Default wallet set', wallets: user.wallets });
  } catch (error) {
    res.status(500).send({ message: 'Error setting default wallet', error: error.message });
  }
};