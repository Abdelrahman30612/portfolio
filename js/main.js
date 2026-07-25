document.addEventListener('DOMContentLoaded', function() {
  // Loading Screen
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => { loadingScreen.classList.add('hidden'); }, 1000);

  // Loading Bar
  const loadingBar = document.getElementById('loadingBar');
  window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    loadingBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
  });

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.addEventListener('click', function() {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile Menu
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Back to Top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    backToTop.classList.toggle('visible', window.pageYOffset > 300);
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Active Nav Link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
      if (pageYOffset >= section.offsetTop - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // Custom Cursor
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  if (cursor && cursorFollower && window.innerWidth > 900) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      }, 50);
    });
  }

  // Parallax
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (parallaxLayers.length > 0 && window.innerWidth > 900) {
    window.addEventListener('scroll', function() {
      parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 0.5;
        layer.style.transform = `translateY(${-(window.pageYOffset * speed)}px)`;
      });
    });
  }

  // Scroll Animation
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));

  // ========== LOAD SETTINGS ==========
  async function loadSettings() {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('API not available');
      const s = await res.json();

      // Meta
      setText('metaTitleEl', s.metaTitle, 'content');
      setText('metaDescEl', s.metaDesc, 'content');
      setText('metaKeywordsEl', s.metaKeywords, 'content');
      setText('ogTitleEl', s.metaTitle, 'content');
      setText('ogDescEl', s.metaDesc, 'content');
      if (s.metaTitle) document.title = s.metaTitle;

      // Logo
      setText('logoName', s.siteName);
      setText('footerLogoName', s.siteName);

      // Social links
      setHref('socialGithubSide', s.socialGithub);
      setHref('socialTwitterSide', s.socialTwitter);
      setHref('socialLinkedinSide', s.socialLinkedin);
      setHref('socialGithubFooter', s.socialGithub);
      setHref('socialTwitterFooter', s.socialTwitter);
      setHref('socialLinkedinFooter', s.socialLinkedin);

      // Hero
      setText('heroHeadline', s.heroHeadline);
      setText('heroDesc', s.heroDesc);
      setText('heroBtn', s.heroButtonText);
      setText('statusText', s.statusText);
      setText('statusProject', s.statusProject);

      // Quote
      setText('quoteText', s.quoteText);
      setText('quoteAuthor', s.quoteAuthor);

      // About
      setText('aboutGreeting', s.aboutGreeting);
      setText('aboutP1', s.aboutP1);
      setText('aboutP2', s.aboutP2);
      setText('aboutBtn', s.aboutButtonText);

      // Contact
      setText('contactDesc', s.contactDesc);
      setText('contactTitle', s.contactTitle);
      setText('contactDiscord', s.discord);
      setText('contactEmail', s.email);

      // Newsletter
      setText('newsletterTitle', s.newsletterTitle);
      setText('newsletterDesc', s.newsletterDesc);

      // Footer
      setText('footerCopyright', s.footerCopyright);
      setText('footerTagline', s.footerTagline);
      setText('footerEmail', s.email);

      // Skills
      if (s.skills && s.skills.length > 0) {
        const container = document.getElementById('skillsContainer');
        container.innerHTML = s.skills.map(sk =>
          `<div class="skill-box${sk.items.split('\n').length > 2 ? ' tall' : ''}">
            <h4>${sk.name}</h4>
            <p>${sk.items.replace(/\n/g, '<br>')}</p>
          </div>`
        ).join('');
      }

      // Timeline
      if (s.timeline && s.timeline.length > 0) {
        const container = document.getElementById('timelineContainer');
        container.innerHTML = s.timeline.map(t =>
          `<div class="timeline-item">
            <div class="date">${t.date}</div>
            <h3>${t.title}</h3>
            <div class="company">${t.company}</div>
            <p>${t.desc}</p>
          </div>`
        ).join('');
      }

      // Blog
      if (s.blog && s.blog.length > 0) {
        const container = document.getElementById('blogContainer');
        container.innerHTML = s.blog.map(b =>
          `<div class="blog-card">
            <div class="blog-image"><i class="fas ${b.icon || 'fa-pen'}"></i></div>
            <div class="blog-content">
              <div class="blog-date">${b.date}</div>
              <h3>${b.title}</h3>
              <p>${b.desc || ''}</p>
              <a href="${b.link || '#'}" class="read-more">Read more →</a>
            </div>
          </div>`
        ).join('');
      }

      // Testimonials
      if (s.testimonials && s.testimonials.length > 0) {
        const track = document.getElementById('testimonialsTrack');
        const dotsContainer = document.getElementById('testimonialDots');
        track.innerHTML = s.testimonials.map(t =>
          `<div class="testimonial-card">
            <div class="quote-icon">❝</div>
            <p>${t.quote}</p>
            <div class="author">— ${t.author}</div>
            <div class="role">${t.role || ''}</div>
          </div>`
        ).join('');
        dotsContainer.innerHTML = s.testimonials.map((_, i) =>
          `<span class="dot${i === 0 ? ' active' : ''}" data-index="${i}"></span>`
        ).join('');
        initSlider();
      }

      return s;
    } catch (e) {
      console.log('Settings API not available, using default HTML content');
      return null;
    }
  }

  function setText(id, value, attr) {
    const el = document.getElementById(id);
    if (!el || !value) return;
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  }
  function setHref(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.href = value;
  }

  // ========== PROJECTS ==========
  const projectsGrid = document.getElementById('projectsGrid');
  let allProjects = [];
  let projectCount = 0;
  let uniqueTechCount = 0;

  function renderProjects(projects) {
    projectsGrid.innerHTML = projects.map(p => `
      <div class="project-card fade-in" data-tags="${(p.tags || '').toLowerCase()}" data-category="${p.category || 'all'}" data-id="${p._id}">
        <div class="project-thumb" style="background:linear-gradient(135deg,#2d1f4e,#1a1528);">
          <div class="thumb-title" style="color:var(--accent);">${p.title}</div>
        </div>
        <div class="project-tags">${p.tags}</div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-actions">
            <a href="javascript:void(0)" class="chip see-more" data-id="${p._id}">See more</a>
            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="chip live">Live visit</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
    document.querySelectorAll('.project-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.see-more').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const project = allProjects.find(p => p._id === id);
        if (project) openProjectModal(project);
      });
    });
    initFilters();
  }

  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filter === 'all') { card.style.display = 'flex'; return; }
          const cat = card.getAttribute('data-category');
          const tags = card.getAttribute('data-tags');
          card.style.display = (cat === filter || (tags && tags.includes(filter))) ? 'flex' : 'none';
        });
      });
    });
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        projectCards.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          const desc = card.querySelector('p').textContent.toLowerCase();
          card.style.display = (title.includes(term) || desc.includes(term)) ? 'flex' : 'none';
        });
      });
    }
  }

  // ========== PROJECT MODAL ==========
  function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalTags').textContent = project.tags;
    document.getElementById('modalDesc').textContent = project.description;

    const imagesContainer = document.getElementById('modalImages');
    if (project.image) {
      imagesContainer.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
    } else {
      imagesContainer.innerHTML = `<div style="grid-column:1/-1;background:var(--card);border-radius:10px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:var(--text-dim);border:1px solid var(--card-border);"><i class="fas fa-image" style="font-size:2rem;"></i></div>`;
    }

    const liveBtn = document.getElementById('modalLive');
    if (project.liveUrl) {
      liveBtn.href = project.liveUrl;
      liveBtn.style.display = 'inline-block';
    } else {
      liveBtn.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeProjectModal();
  });

  async function loadProjects() {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('API not available');
      allProjects = await res.json();
      projectCount = allProjects.length;

      // Calculate unique technologies from all tags
      const techSet = new Set();
      allProjects.forEach(p => {
        if (p.tags) p.tags.split(',').forEach(t => techSet.add(t.trim().toLowerCase()));
      });
      uniqueTechCount = techSet.size;

      if (allProjects.length > 0) {
        renderProjects(allProjects.sort((a, b) => (a.order || 0) - (b.order || 0)));
      } else {
        projectsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px;">No projects yet. Add some from the <a href="/admin" style="color:var(--accent);">admin panel</a>.</p>';
      }
    } catch (e) {
      projectsGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px;">Cannot connect to API. Run <code>npm start</code> to enable.</p>';
    }
  }

  // ========== AUTO STATS ==========
  async function updateStats(settings) {
    const years = settings && settings.startYear ? new Date().getFullYear() - parseInt(settings.startYear) : 0;
    const clients = settings ? (settings.happyClients || 0) : 0;

    animateNumber(document.getElementById('statProjects'), projectCount);
    animateNumber(document.getElementById('statClients'), clients);
    animateNumber(document.getElementById('statYears'), years);
    animateNumber(document.getElementById('statTech'), uniqueTechCount);
  }

  function animateNumber(el, target) {
    if (!el) return;
    let current = 0;
    const increment = Math.max(1, target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + '+';
      }
    }, 30);
  }

  // ========== TESTIMONIALS SLIDER ==========
  function initSlider() {
    const track = document.getElementById('testimonialsTrack');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentSlide = 0;
    function goToSlide(index) {
      currentSlide = index;
      if (track) track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        goToSlide(parseInt(this.getAttribute('data-index')));
      });
    });
    if (track && dots.length > 0) {
      setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        goToSlide(currentSlide);
      }, 5000);
    }
  }

  // Contact Form
  const contactFormElement = document.getElementById('contactFormElement');
  const formSuccess = document.getElementById('formSuccess');
  if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      setTimeout(() => {
        this.style.display = 'none';
        formSuccess.classList.add('show');
        setTimeout(() => {
          this.reset();
          this.style.display = 'block';
          formSuccess.classList.remove('show');
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // Typing Effect
  const headline = document.querySelector('h1.headline');
  if (headline) {
    const text = headline.innerHTML;
    headline.innerHTML = '';
    headline.style.opacity = '1';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        if (text.substring(i, i + 4) === '<sp') {
          const endTag = text.indexOf('>', i);
          headline.innerHTML += text.substring(i, endTag + 1);
          i = endTag + 1;
        } else {
          headline.innerHTML += text.charAt(i);
          i++;
        }
        setTimeout(typeWriter, 30);
      }
    }
    setTimeout(typeWriter, 1200);
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ========== INIT ==========
  loadSettings().then(s => {
    loadProjects().then(() => updateStats(s));
  });
});
