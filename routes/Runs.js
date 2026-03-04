const express = require('express');
const router = express.Router();
const Run = require('../models/run');

// GET /runs — get all runs
router.get('/', async (req, res) => {
  try {
    const runs = await Run.find().sort({ date: -1 });
    res.json(runs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch runs' });
  }
});

// GET /runs/:id — get a single run
router.get('/:id', async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);
    if (!run) return res.status(404).json({ error: 'Run not found' });
    res.json(run);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch run' });
  }
});

// POST /runs — log a new run
router.post('/', async (req, res) => {
  const { userId, name, date, distance_miles, duration_minutes, pace, notes, runType } = req.body;
  try {
    const newRun = await Run.create({
      userId,
      name,
      date,
      distance_miles,
      duration_minutes,
      pace,
      notes,
      runType,
    });
    res.status(201).json(newRun);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create run' });
  }
});

// PUT /runs/:id — update a run
router.put('/:id', async (req, res) => {
  try {
    const updatedRun = await Run.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRun) return res.status(404).json({ error: 'Run not found' });
    res.json(updatedRun);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update run' });
  }
});

// DELETE /runs/:id — delete a run
router.delete('/:id', async (req, res) => {
  try {
    const deletedRun = await Run.findByIdAndDelete(req.params.id);
    if (!deletedRun) return res.status(404).json({ error: 'Run not found' });
    res.json({ message: 'Run deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete run' });
  }
});

module.exports = router;