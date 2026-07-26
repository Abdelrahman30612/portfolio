const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Firebase
const db = require('../server/db');

// API Routes
app.use('/api/projects', require('../server/routes/projects'));
app.use('/api/settings', require('../server/routes/settings'));
app.use('/api/upload', require('../server/routes/upload'));

// Admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../server/views/admin.html'));
});

// Seed
db.seedIfEmpty().catch(console.error);

module.exports = app;
