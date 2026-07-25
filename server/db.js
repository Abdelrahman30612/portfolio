const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../data.json');

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const defaultData = {
      projects: [
        { _id: '1', title: 'Kashkoul', description: 'An AI-powered web app that helps you explore universities worldwide and find the perfect match for your academic journey.', tags: 'React, Node.js, AI', category: 'react', liveUrl: '', githubUrl: '', image: '', order: 1, featured: true, createdAt: new Date().toISOString() },
        { _id: '2', title: 'Journly', description: 'A full-stack web application that lets you write, organize, and revisit your personal journals with a clean, distraction-free experience.', tags: 'HTML, CSS, JavaScript', category: 'html', liveUrl: '', githubUrl: '', image: '', order: 2, featured: true, createdAt: new Date().toISOString() },
        { _id: '3', title: 'Portfolio', description: 'A portfolio website with a minimal, clean aesthetic and modern UI/UX design.', tags: 'HTML, CSS, JavaScript', category: 'html', liveUrl: '', githubUrl: '', image: '', order: 3, featured: true, createdAt: new Date().toISOString() },
        { _id: '4', title: 'Culinaria', description: 'A web app that uses AI to generate recipes from a photo of your ingredients, making cooking easier and more accessible.', tags: 'HTML, CSS, JavaScript', category: 'html', liveUrl: '', githubUrl: '', image: '', order: 4, featured: true, createdAt: new Date().toISOString() },
        { _id: '5', title: 'React Todo App', description: 'A clean and intuitive todo application built with React, featuring task management and filtering capabilities.', tags: 'React, JavaScript', category: 'react', liveUrl: '', githubUrl: '', image: '', order: 5, featured: false, createdAt: new Date().toISOString() },
        { _id: '6', title: 'Python Web Scraper', description: 'A Python-based web scraper that extracts and organizes data from various websites automatically.', tags: 'Python, BeautifulSoup', category: 'python', liveUrl: '', githubUrl: '', image: '', order: 6, featured: false, createdAt: new Date().toISOString() },
        { _id: '7', title: 'Node.js API', description: 'A RESTful API built with Node.js and Express for managing portfolio data with authentication.', tags: 'Node.js, Express, MongoDB', category: 'node', liveUrl: '', githubUrl: '', image: '', order: 7, featured: false, createdAt: new Date().toISOString() }
      ],
      settings: {
        siteName: 'Abdelrahman',
        metaTitle: 'Abdelrahman — Web Designer & Front-end Developer',
        metaDesc: 'Abdelrahman - Self-taught front-end developer crafting responsive websites where technologies meet creativity.',
        metaKeywords: 'web designer, front-end developer, portfolio, React, Vue, JavaScript',
        heroHeadline: 'Abdelrahman is a web designer and front-end developer',
        heroDesc: 'He crafts responsive websites where technologies meet creativity',
        heroButtonText: 'Contact me !!',
        statusText: 'Currently working on',
        statusProject: 'Portfolio',
        quoteText: 'With great power comes great electricity bill',
        quoteAuthor: '– Dr. Who',
        startYear: 2022,
        happyClients: 30,
        aboutGreeting: "Hello, i'm Abdelrahman!",
        aboutP1: "I'm a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.",
        aboutP2: "Transforming my creativity and knowledge into websites has been my passion for over a year. I have been helping various clients establish their presence online. I always strive to learn about the newest technologies and frameworks.",
        aboutButtonText: 'Read more →',
        skills: [
          { name: 'Languages', items: 'TypeScript · Lua\nPython · JavaScript' },
          { name: 'Databases', items: 'SQLite · PostgreSQL\nMongo' },
          { name: 'Tools', items: 'VSCode · Neovim · Linux\nFigma · XFCE · Arch\nGit · Font Awesome' },
          { name: 'Other', items: 'HTML · CSS · EJS · SCSS\nREST · Jinja' },
          { name: 'Frameworks', items: 'React · Vue\nDisnake · Discord.js\nFlask · Express.js' }
        ],
        timeline: [
          { date: '2022 - Present', title: 'Front-end Developer', company: 'Freelance', desc: 'Building responsive websites and web applications for various clients using modern technologies.' },
          { date: '2021 - 2022', title: 'Web Designer', company: 'Self-taught', desc: 'Learning web design principles and creating mockups in Figma for personal projects.' },
          { date: '2020 - 2021', title: 'Started Coding Journey', company: 'Self-taught', desc: 'Began learning HTML, CSS, and JavaScript. Built first projects and fell in love with web development.' }
        ],
        blog: [
          { date: 'Jan 15, 2024', title: 'Getting Started with React', desc: "A beginner's guide to building modern UIs with React...", icon: 'fa-code', link: '#' },
          { date: 'Feb 08, 2024', title: 'My Figma Workflow', desc: 'How I design beautiful interfaces before coding...', icon: 'fa-palette', link: '#' },
          { date: 'Mar 20, 2024', title: 'Deploying Your First App', desc: 'Step by step guide to deploying your web application...', icon: 'fa-rocket', link: '#' }
        ],
        testimonials: [
          { quote: 'Abdelrahman delivered an outstanding website that exceeded our expectations. His attention to detail and technical skills are impressive.', author: 'Alex Johnson', role: 'CEO, TechStart' },
          { quote: 'Working with Abdelrahman was a pleasure. He understood our vision and brought it to life with clean, modern code.', author: 'Sarah Miller', role: 'Founder, DesignCo' },
          { quote: "Highly recommend Abdelrahman for any front-end development work. He's talented, reliable, and great to work with.", author: 'Mike Chen', role: 'CTO, InnovateLab' }
        ],
        contactDesc: "I'm interested in freelance opportunities. However, if you have other requests or questions, don't hesitate to contact me.",
        contactTitle: 'Message me here',
        discord: '!Abdelrahman#3519',
        email: 'abdelrahman@dev.ml',
        newsletterTitle: 'Subscribe to my newsletter',
        newsletterDesc: 'Get the latest updates about my work and blog posts.',
        footerCopyright: '© Copyright 2022. Made by Abdelrahman',
        footerTagline: 'Web designer and front-end developer',
        socialGithub: 'https://github.com/',
        socialTwitter: 'https://twitter.com/',
        socialLinkedin: 'https://linkedin.com/'
      }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
