const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db');

// Get settings
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.settings);
});

// Update settings
router.put('/', (req, res) => {
  const db = readDB();
  db.settings = { ...db.settings, ...req.body };
  writeDB(db);
  res.json(db.settings);
});

module.exports = router;
