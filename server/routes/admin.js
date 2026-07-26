const express = require('express');
const router = express.Router();
const path = require('path');

// Login page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Dashboard (admin panel)
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin.html'));
});

module.exports = router;
