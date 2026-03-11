// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    stravaId: { type: Number, required: true, unique: true },
    username:  { type: String },
    firstname: { type: String },
    lastname:  { type: String },
    profilePic: { type: String },
    accessToken:    { type: String, required: true },
    refreshToken:   { type: String, required: true },
    tokenExpiresAt: { type: Number, required: true }, // Unix timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);