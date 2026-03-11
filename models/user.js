const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  stravaId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  raceDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
