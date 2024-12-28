// server/db/SemanticSchema.js
import mongoose from 'mongoose';

// Semantic Schema to hold nested attributes
const SemanticSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed }, // Allows for various types
}, { _id: false }); // Disable default _id for subdocuments

export default SemanticSchema;