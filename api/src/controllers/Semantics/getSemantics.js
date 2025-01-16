// server/controllers/Semantics/getSemantics.js
import { Users } from '../../db/Schemas/UserSchema.js';

export const getSemantics = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await Users.findOne({ username }, 'semantics language');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({
      message: `Semantics data retrieved for ${username}`,
      semantics: user.semantics,
      language: user.language,
    });
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve semantics', error: error.message });
  }
};