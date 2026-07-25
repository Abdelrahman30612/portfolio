const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db');

// Get all projects
router.get('/', (req, res) => {
  const db = readDB();
  const projects = db.projects.sort((a, b) => (a.order || 0) - (b.order || 0));
  res.json(projects);
});

// Get single project
router.get('/:id', (req, res) => {
  const db = readDB();
  const project = db.projects.find(p => p._id === req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

// Create project
router.post('/', (req, res) => {
  const db = readDB();
  const project = {
    _id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    category: req.body.category || 'all',
    liveUrl: req.body.liveUrl || '',
    githubUrl: req.body.githubUrl || '',
    image: req.body.image || '',
    order: req.body.order || 0,
    featured: req.body.featured || false,
    createdAt: new Date().toISOString()
  };
  db.projects.push(project);
  writeDB(db);
  res.status(201).json(project);
});

// Update project
router.put('/:id', (req, res) => {
  const db = readDB();
  const index = db.projects.findIndex(p => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Project not found' });
  db.projects[index] = { ...db.projects[index], ...req.body };
  writeDB(db);
  res.json(db.projects[index]);
});

// Delete project
router.delete('/:id', (req, res) => {
  const db = readDB();
  const index = db.projects.findIndex(p => p._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Project not found' });
  db.projects.splice(index, 1);
  writeDB(db);
  res.json({ message: 'Project deleted' });
});

module.exports = router;
