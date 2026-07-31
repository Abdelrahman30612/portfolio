const { db } = require('./firebase');

const PROJECTS_COLLECTION = 'projects';
const SETTINGS_COLLECTION = 'settings';

// Default settings
const defaultSettings = {
  siteName: 'Abdelrahman Mustafa',
  metaTitle: 'Abdelrahman Mustafa — Full-Stack Developer',
  metaDesc: 'Abdelrahman Mustafa - Full-Stack Developer specializing in PHP, Laravel, React.js, and modern web technologies.',
  metaKeywords: 'full-stack developer, PHP, Laravel, React.js, JavaScript, Node.js, web developer, Egypt',
  heroHeadline: 'Abdelrahman is a Full-Stack Developer',
  heroDesc: 'Crafting scalable web solutions with PHP, Laravel, React.js & Node.js',
  heroButtonText: 'Contact me !!',
  statusText: 'Currently working on',
  statusProject: 'Portfolio',
  quoteText: 'With great power comes great electricity bill',
  quoteAuthor: '– Dr. Who',
  startYear: 2025,
  happyClients: 15,
  aboutGreeting: "Hello, I'm Abdelrahman!",
  aboutP1: "Detail-oriented Computer Science student and Full-Stack Developer at Egyptian E-Learning University (EELU). Proven track record in developing software solutions with strong expertise in back-end development, modern frameworks, and digital project management.",
  aboutP2: "I have completed intensive training programs at Meta, ITI, and NTI-Creativa, gaining hands-on experience in PHP, Laravel, React.js, and Node.js. I am passionate about building scalable web applications and always strive to learn about the newest technologies and frameworks.",
  aboutButtonText: 'Read more →',
  skills: [
    { name: 'Languages', items: 'JavaScript · PHP\nPython · Java\nSQL · HTML5 · CSS3' },
    { name: 'Back-End', items: 'Node.js · Express.js\nLaravel · RESTful APIs' },
    { name: 'Front-End', items: 'React.js\nResponsive Web Design\nUI/UX Principles' },
    { name: 'Databases', items: 'MongoDB · MySQL\nRelational DB Design\nERD Structuring' },
    { name: 'Tools', items: 'Git · GitHub\nn8n · Workflow Automation\nProblem Solving' }
  ],
  timeline: [
    { date: 'June 2026 - Sep 2026', title: 'PHP Web Development Trainee', company: 'Information Technology Institute (ITI)', desc: 'Awarded and completed an intensive scholarship program specializing in PHP and backend web development. Gained hands-on experience with modern backend architecture, database integration, and industry-standard software lifecycle practices.' },
    { date: 'March 2026 - July 2026', title: 'Front-End Development Trainee', company: 'Meta', desc: 'Completed a comprehensive front-end development program, gaining deep expertise in building responsive, accessible, and high-performance web applications with React.js.' },
    { date: 'March 2026 - June 2026', title: 'Full-Stack PHP Trainee', company: 'NTI - Creativa', desc: 'Completed an intensive Full-Stack PHP development program, mastering backend architecture, database management, and modern PHP frameworks to deliver scalable enterprise solutions.' },
    { date: 'Sep 2025 - Jan 2026', title: 'Software Developer', company: 'Academic & Personal Projects', desc: 'Designed and implemented practical desktop and web applications utilizing Python and Java, applying robust OOP principles.' }
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
  contactDesc: "I'm interested in freelance opportunities and professional collaborations. However, if you have other requests or questions, don't hesitate to contact me.",
  contactTitle: 'Message me here',
  discord: 'eng.abdulrahman.mustafa@gmail.com',
  email: 'eng.abdulrahman.mustafa@gmail.com',
  phone: '+201025565796',
  location: 'Menofuia, Egypt',
  newsletterTitle: 'Subscribe to my newsletter',
  newsletterDesc: 'Get the latest updates about my work and blog posts.',
  footerCopyright: '© Copyright 2025. Made by Abdelrahman Mustafa',
  footerTagline: 'Full-Stack Developer',
  socialGithub: 'https://github.com/Abdelrahman30612',
  socialTwitter: 'https://twitter.com/',
  socialLinkedin: 'https://www.linkedin.com/in/abdelrahman-mustafa',
  certifications: [
    { title: 'Front-End Development', issuer: 'Meta', icon: 'fa-certificate' },
    { title: 'PHP Web Development', issuer: 'ITI', icon: 'fa-certificate' },
    { title: 'Full-Stack PHP', issuer: 'NTI & Creativa', icon: 'fa-certificate' },
    { title: 'CS50x', issuer: 'Harvard University', icon: 'fa-certificate' },
    { title: 'CCNA', issuer: 'Cisco Networking Academy', icon: 'fa-certificate' },
    { title: 'Back-End with PHP', issuer: 'Maharah Tech', icon: 'fa-certificate' }
  ],
  adminPassword: 'AbdoAbrazeq@123'
};

const defaultProjects = [
  { title: 'Shipping Company Management System', description: 'Architected and developed a comprehensive shipping and logistics management system from scratch using the Laravel framework. Implemented complex backend operations, routing, and database relational models to streamline shipping processes and tracking.', tags: 'PHP, Laravel, MySQL', category: 'html', liveUrl: '', githubUrl: '', image: '', order: 1, featured: true },
  { title: 'Cafe Management Website', description: 'Built a fully integrated, dynamic cafe website utilizing native PHP and SQL for efficient database interactions. Designed the system to handle administrative tasks, content management, and user requests seamlessly.', tags: 'PHP, SQL, HTML, CSS', category: 'html', liveUrl: '', githubUrl: '', image: '', order: 2, featured: true },
  { title: 'Medical Landing Pages', description: 'Designed and developed over 5 highly responsive and conversion-optimized landing pages for healthcare professionals and doctors. Focused on UI/UX best practices to enhance user engagement.', tags: 'HTML, CSS, JavaScript', category: 'html', liveUrl: '', githubUrl: '', image: '', order: 3, featured: true },
  { title: 'Portfolio Websites', description: 'Built and deployed more than 6 custom portfolio websites tailored to individual client needs. Ensured mobile responsiveness, cross-browser compatibility, and interactive web elements.', tags: 'HTML, CSS, JavaScript, React', category: 'react', liveUrl: '', githubUrl: '', image: '', order: 4, featured: true },
  { title: 'Hypermarket Database Architecture', description: 'Designed a comprehensive Entity-Relationship Diagram (ERD) for a robust hypermarket management system. Structured complex relational database schemas to efficiently manage inventory, sales operations, and product categories.', tags: 'SQL, Database Design, ERD', category: 'html', liveUrl: '', githubUrl: '', image: '', order: 5, featured: false },
  { title: 'Node.js REST API', description: 'A RESTful API built with Node.js and Express for managing portfolio data with authentication and CRUD operations.', tags: 'Node.js, Express, MongoDB', category: 'node', liveUrl: '', githubUrl: '', image: '', order: 6, featured: false },
  { title: 'React Todo App', description: 'A clean and intuitive todo application built with React, featuring task management and filtering capabilities.', tags: 'React, JavaScript', category: 'react', liveUrl: '', githubUrl: '', image: '', order: 7, featured: false }
];

// Seed Firestore if empty
async function seedIfEmpty() {
  const settingsSnap = await db.collection(SETTINGS_COLLECTION).doc('main').get();
  if (!settingsSnap.exists) {
    await db.collection(SETTINGS_COLLECTION).doc('main').set(defaultSettings);
    console.log('✅ Default settings seeded');
  }

  const projectsSnap = await db.collection(PROJECTS_COLLECTION).get();
  if (projectsSnap.empty) {
    for (const p of defaultProjects) {
      await db.collection(PROJECTS_COLLECTION).add({ ...p, createdAt: new Date().toISOString() });
    }
    console.log('✅ Default projects seeded');
  }
}

// Projects
async function getProjects() {
  const snap = await db.collection(PROJECTS_COLLECTION).orderBy('order', 'asc').get();
  return snap.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
}

async function getProject(id) {
  const doc = await db.collection(PROJECTS_COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { _id: doc.id, ...doc.data() };
}

async function createProject(data) {
  const docRef = await db.collection(PROJECTS_COLLECTION).add({ ...data, createdAt: new Date().toISOString() });
  return { _id: docRef.id, ...data };
}

async function updateProject(id, data) {
  await db.collection(PROJECTS_COLLECTION).doc(id).update(data);
  return { _id: id, ...data };
}

async function deleteProject(id) {
  await db.collection(PROJECTS_COLLECTION).doc(id).delete();
}

// Settings
async function getSettings() {
  const doc = await db.collection(SETTINGS_COLLECTION).doc('main').get();
  if (!doc.exists) {
    await db.collection(SETTINGS_COLLECTION).doc('main').set(defaultSettings);
    return defaultSettings;
  }
  return doc.data();
}

async function updateSettings(data) {
  await db.collection(SETTINGS_COLLECTION).doc('main').update(data);
  return data;
}

module.exports = {
  seedIfEmpty,
  getProjects, getProject, createProject, updateProject, deleteProject,
  getSettings, updateSettings
};
