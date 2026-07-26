const express = require('express');
const router = express.Router();
const db = require('../db');

// Login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    const settings = await db.getSettings();
    if (password === settings.adminPassword) {
      res.json({ success: true, token: 'admin-' + Date.now() });
    } else {
      res.status(401).json({ success: false, message: 'Wrong password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify token
router.post('/verify', (req, res) => {
  const { token } = req.body;
  if (token && token.startsWith('admin-')) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
