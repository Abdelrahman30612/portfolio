const express = require('express');
const router = express.Router();
const db = require('../db');

// Login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    const settings = await db.getSettings();
    if (password === settings.adminPassword) {
      const token = 'admin-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      // Set cookie expires in 24 hours
      res.cookie('adminToken', token, { 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
      });
      res.json({ success: true, token: token });
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

// Verify cookie
router.get('/verify-cookie', (req, res) => {
  const token = req.cookies?.adminToken;
  if (token && token.startsWith('admin-')) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true });
});

module.exports = router;
