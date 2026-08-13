const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  type: { type: String, enum: ['desk', 'meeting_room', 'private_office'], required: true },
  capacity: { type: Number, required: true, min: 1 },
  price_per_hour: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Workspace', workspaceSchema);
