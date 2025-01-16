// server/controllers/Wallets/modules/deleteWallet.js
import { Users } from '../../../db/Schemas/UserSchema.js';

export const deleteWallet = async (req, res) => {
  const { username } = req.params;
  const { address } = req.body;
  try {
    const user = await Users.findOneAndUpdate(
      { username },
      { $pull: { wallets: { address } } },
      { new: true }
    );
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.status(200).send({ message: 'Wallet deleted', wallets: user.wallets });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting wallet', error: error.message });
  }
};