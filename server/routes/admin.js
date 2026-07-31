const express = require('express');
const router = express.Router();
const path = require('path');

// Login page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Dashboard (admin panel) - requires authentication
router.get('/dashboard', (req, res) => {
  const token = req.cookies?.adminToken;
  if (token && token.startsWith('admin-')) {
    res.sendFile(path.join(__dirname, '../views/admin.html'));
  } else {
    res.redirect('/admin');
  }
});

module.exports = router;
