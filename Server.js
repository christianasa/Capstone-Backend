// server.js
// npm install express bcryptjs jsonwebtoken cors mongoose dotenv

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

// ── Connect to MongoDB ─────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pacetrack';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => { console.error('❌ MongoDB connection error:', err); process.exit(1); });

// ── Auth routes (/auth/login, /auth/register) ──────────
app.use('/auth', authRoutes);

// ── JWT middleware (reuse for protecting other routes) ──
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
  require('jsonwebtoken').verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// ── Your existing /runs routes (now protected) ─────────
// Example — adapt to however your runs routes are set up:
// app.use('/runs', authenticateToken, require('./routes/runs'));

// ── Health check ───────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

