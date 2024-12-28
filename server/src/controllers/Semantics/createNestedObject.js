// server/controllers/Semantics/createNestedObject.js
export default function createNestedObject(base, keys, value) {
    let current = base;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}; // Create nested objects as needed
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }