// server/controllers/Semantics/initializeLanguageLayers.js
/*The initializeLanguageLayers function is a helper function
 designed to break down and organize different layers of language structure 
 from a given dynamicPath in the user’s semantics. 
 It does this by processing the path into smaller units 
 (like characters, words, and phrases) and storing them within a structured language model in the user’s data.
*/
export default function initializeLanguageLayers(base, dynamicPath) {
    const words = dynamicPath.split(/&&|\/|_/);
    words.forEach((word) => {
      word.split('').forEach((char) => {
        if (!base.language.characters[char]) {
          base.language.characters[char] = {};
        }
      });
      if (!base.language.words[word]) {
        base.language.words[word] = {};
      }
    });
  
    base.language.phrases[dynamicPath] = { words, lastAccessed: Date.now() };
  }