const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../server/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, '../server/uploads')));

// API Routes
app.use('/api/projects', require('../server/routes/projects'));
app.use('/api/settings', require('../server/routes/settings'));
app.use('/api/upload', require('../server/routes/upload'));
app.use('/admin', require('../server/routes/admin'));

// Seed database
db.seedIfEmpty().catch(console.error);

module.exports = app;
