const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
