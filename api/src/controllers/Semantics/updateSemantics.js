// server/controllers/Semantics/updateSemantics.js
import { Users } from '../../db/Schemas/UserSchema.js';
import calculateWeight from '../../scripts/weights/semanticPathWeighting.js';
import createNestedObject from './createNestedObject.js';
import initializeLanguageLayers from './initializeLanguageLayers.js';

export const updateSemantics = async (req, res) => {
  const { username } = req.params;
  const dynamicPath = req.params[0];
  const newAttributes = req.body;

  try {
    let user = await Users.findOne({ username });

    if (!user) {
      user = new Users({
        username,
        semantics: {},
        isPlaceholder: true,
      });
    }

    if (!user.semantics) user.semantics = {};

    const [entitiesPath, context] = dynamicPath.split('/');
    const entities = entitiesPath ? entitiesPath.split('&&') : [];

    if (!user.language) {
      user.language = {
        characters: new Map(),
        words: new Map(),
        phrases: new Map(),
        fullLanguage: null,
      };
    }

    const keys = dynamicPath.split('/');
    createNestedObject(user.semantics, keys, newAttributes);
    initializeLanguageLayers(user, dynamicPath);

    const weight = calculateWeight({
      entities,
      context,
      frequency: (user.semantics[dynamicPath]?.frequency || 0) + 1,
      lastAccessed: user.semantics[dynamicPath]?.lastAccessed || Date.now(),
      userSemantics: user.semantics,
    });
    createNestedObject(user.semantics, keys, { ...newAttributes, weight });

    await user.save();

    res.status(200).send({
      message: `Semantics and language layers updated for ${dynamicPath}`,
      semantics: user.semantics,
    });
  } catch (error) {
    res.status(500).send({ message: 'Failed to update semantics', error: error.message });
  }
};