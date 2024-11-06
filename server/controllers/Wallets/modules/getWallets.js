// server/controllers/Wallets/modules/getWallets.js
import { Users } from '../../../db/Schemas/UserSchema.js';

export const getWallets = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await Users.findOne({ username }, 'wallets');
    console.log(user), 'user';
    if (!user) return res.status(404).send({ message: 'User not found' });
    res.status(200).send({ wallets: user.wallets });
  } catch (error) {
    res.status(500).send({ message: 'Error retrieving wallets', error: error.message });
  }
};