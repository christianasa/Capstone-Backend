const express = require('express');
const router = express.Router();
const axios = require('axios');

// Step 1 — Redirect user to Strava login
router.get('/login', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.STRAVA_CLIENT_ID,
    redirect_uri: process.env.STRAVA_REDIRECT_URI,
    response_type: 'code',
    scope: 'activity:read_all',
  });

  res.redirect(`https://www.strava.com/oauth/authorize?${params}`);
});

// Step 2 — Strava redirects back here with a code
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token, athlete } = response.data;

    // For now, send tokens back to the frontend
    // In production you'd save these to your database
    res.json({
      message: 'Authenticated!',
      access_token,
      refresh_token,
      athlete,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

module.exports = router;
