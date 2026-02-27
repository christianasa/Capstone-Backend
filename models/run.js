const mongoose = require('mongoose');

const RunSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stravaId: { type: String },
  name: { type: String },
  date: { type: Date, required: true },
  distance_miles: { type: Number, required: true },
  duration_minutes: { type: Number, required: true },
  pace: { type: String },
  notes: { type: String },
  runType: { type: String, enum: ['Easy', 'Tempo', 'Long', 'Race', 'Other'], default: 'Easy' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Run', RunSchema);
