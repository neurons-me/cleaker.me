// server/scripts/weights/semanticPathWeighting.js

// Import synonyms dictionary (optional if you want a custom list or library-based approach)
const synonyms = {
    "travel": ["trip", "journey", "adventure"],
    "friend": ["companion", "ally", "partner"]
    // Add more as needed
  };
  
  // Calculate base weight based on number of entities
  function baseEntityWeight(entities) {
    return entities.length * 10; // Arbitrary base weight per entity
  }
  
  // Boost weight based on frequency
  function frequencyBoost(frequency) {
    return Math.log(frequency + 1) * 5; // Logarithmic boost to avoid excessive weight
  }
  
  // Boost weight based on similarity to existing paths (synonym proximity)
  function similarityBoost(context, userSemantics) {
    let boost = 0;
    for (const key in userSemantics) {
      if (synonyms[context]?.includes(key)) {
        boost += 15; // Increase weight if similar context exists
      }
    }
    return boost;
  }
  
  // Apply a decay factor to old paths
  function timeDecay(lastAccessed) {
    const now = Date.now();
    const daysInactive = (now - lastAccessed) / (1000 * 60 * 60 * 24); // Convert ms to days
    return Math.max(0.5, 1 - daysInactive * 0.01); // Decay by 1% per day, with a minimum factor of 0.5
  }
  
  // Main weight calculation function
  function calculateWeight({ entities, context, frequency = 1, lastAccessed, userSemantics }) {
    const entityWeight = baseEntityWeight(entities);
    const frequencyWeight = frequencyBoost(frequency);
    const similarityWeight = similarityBoost(context, userSemantics);
    const decayFactor = lastAccessed ? timeDecay(lastAccessed) : 1;
  
    // Total weight calculation
    return (entityWeight + frequencyWeight + similarityWeight) * decayFactor;
  }
  
  export default calculateWeight;