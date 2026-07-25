require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Settings = require('./models/Settings');

const projects = [
  {
    title: 'Kashkoul',
    description: 'An AI-powered web app that helps you explore universities worldwide and find the perfect match for your academic journey.',
    tags: 'React, Node.js, AI',
    category: 'react',
    liveUrl: '',
    githubUrl: '',
    figmaUrl: 'https://www.figma.com/community',
    order: 1,
    featured: true
  },
  {
    title: 'Journly',
    description: 'A full-stack web application that lets you write, organize, and revisit your personal journals with a clean, distraction-free experience.',
    tags: 'HTML, CSS, JavaScript',
    category: 'html',
    liveUrl: '',
    githubUrl: '',
    figmaUrl: 'https://www.figma.com/community',
    order: 2,
    featured: true
  },
  {
    title: 'Portfolio',
    description: 'A portfolio website with a minimal, clean aesthetic and modern UI/UX design. Crafted with Figma for creative professionals.',
    tags: 'Figma, UI/UX',
    category: 'figma',
    liveUrl: '',
    githubUrl: '',
    figmaUrl: 'https://www.figma.com/community',
    order: 3,
    featured: true
  },
  {
    title: 'Culinaria',
    description: 'A web app that uses AI to generate recipes from a photo of your ingredients, making cooking easier and more accessible.',
    tags: 'HTML, CSS, JavaScript',
    category: 'html',
    liveUrl: '',
    githubUrl: '',
    figmaUrl: '',
    order: 4,
    featured: true
  },
  {
    title: 'React Todo App',
    description: 'A clean and intuitive todo application built with React, featuring task management and filtering capabilities.',
    tags: 'React, JavaScript',
    category: 'react',
    liveUrl: '',
    githubUrl: '',
    order: 5,
    featured: false
  },
  {
    title: 'Python Web Scraper',
    description: 'A Python-based web scraper that extracts and organizes data from various websites automatically.',
    tags: 'Python, BeautifulSoup',
    category: 'python',
    githubUrl: '',
    order: 6,
    featured: false
  },
  {
    title: 'Node.js API',
    description: 'A RESTful API built with Node.js and Express for managing portfolio data with authentication.',
    tags: 'Node.js, Express, MongoDB',
    category: 'node',
    githubUrl: '',
    order: 7,
    featured: false
  }
];

const settings = {
  siteName: 'Abdelrahman',
  heroTitle: 'Abdelrahman is a web designer and front-end developer',
  heroDesc: 'He crafts responsive websites where technologies meet creativity',
  email: 'abdelrahman@dev.ml',
  discord: '!Abdelrahman#3519',
  github: '#',
  twitter: '#',
  linkedin: '#',
  aboutP1: "I'm a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.",
  aboutP2: "Transforming my creativity and knowledge into websites has been my passion for over a year. I have been helping various clients establish their presence online. I always strive to learn about the newest technologies and frameworks.",
  quote: 'With great power comes great electricity bill',
  quoteAuthor: '– Dr. Who'
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connected to MongoDB');

    await Project.deleteMany({});
    await Settings.deleteMany({});
    console.log('🗑️  Cleared existing data');

    await Project.insertMany(projects);
    console.log(`📁 Seeded ${projects.length} projects`);

    await Settings.create(settings);
    console.log('⚙️  Seeded settings');

    console.log('\n✅ Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
