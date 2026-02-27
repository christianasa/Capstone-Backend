const express = require('express');
const router = express.Router();
const Run = require('../models/Run');

// GET /runs — fetch all runs from Strava
router.get('/', async (req, res) => {
  const { access_token } = req.headers;

  try {
    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: { Authorization: `Bearer ${access_token}` },
      params: {
        per_page: 30, // how many runs to return
      }
    });

    // Filter to only runs (not rides, swims, etc.)
    const runs = response.data.filter(activity => activity.type === 'Run');

    // Return clean, useful data
    const formattedRuns = runs.map(run => ({
      id: run.id,
      name: run.name,
      date: run.start_date_local,
      distance_miles: (run.distance / 1609.34).toFixed(2),
      duration_minutes: Math.round(run.moving_time / 60),
      pace: calcPace(run.moving_time, run.distance),
      elevation_ft: (run.total_elevation_gain * 3.281).toFixed(0),
    }));

    res.json(formattedRuns);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch runs' });
  }
});

// GET /runs/:id — fetch a single run
router.get('/:id', async (req, res) => {
  const { access_token } = req.headers;
  const { id } = req.params;

  try {
    const response = await axios.get(`https://www.strava.com/api/v3/activities/${id}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const run = response.data;

    res.json({
      id: run.id,
      name: run.name,
      date: run.start_date_local,
      distance_miles: (run.distance / 1609.34).toFixed(2),
      duration_minutes: Math.round(run.moving_time / 60),
      pace: calcPace(run.moving_time, run.distance),
      description: run.description,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch run' });
  }
});

// Helper — calculate pace as mm:ss per mile
function calcPace(movingTime, distanceMeters) {
  if (!distanceMeters) return 'N/A';
  const distanceMiles = distanceMeters / 1609.34;
  const secondsPerMile = movingTime / distanceMiles;
  const minutes = Math.floor(secondsPerMile / 60);
  const seconds = Math.round(secondsPerMile % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds} /mi`;
}

module.exports = router;