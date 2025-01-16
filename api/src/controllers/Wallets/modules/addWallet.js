// server/controllers/Wallets/modules/addWallet.js
import { Users } from '../../../db/Schemas/UserSchema.js';

export const addWallet = async (req, res) => {
  const { username } = req.params;
  const { address, label, type } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const newWallet = { address, label, type };
    user.wallets.push(newWallet);
    await user.save();
    res.status(201).send({ message: 'Wallet added', wallet: newWallet });
  } catch (error) {
    res.status(500).send({ message: 'Error adding wallet', error: error.message });
  }
};