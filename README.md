# Abdelrahman Portfolio

A modern, responsive portfolio website with admin panel, built with Node.js, Express, and Firebase Firestore.

## Features

- **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- **Dark/Light Theme** - Toggle between themes with localStorage persistence
- **Admin Panel** - Full CRUD for projects, skills, timeline, blog, testimonials
- **Firebase Firestore** - Persistent database that survives deployments
- **File Upload** - Upload project images directly from admin panel
- **Auto Stats** - Projects count, years of experience calculated automatically
- **Password Protected Admin** - Secure login with changeable password

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** Firebase Firestore
- **Hosting:** Railway / Vercel

## Project Structure

```
portfolio/
├── api/
│   └── index.js          # Vercel serverless function
├── server/
│   ├── server.js          # Express server
│   ├── firebase.js        # Firebase config
│   ├── db.js              # Database functions
│   ├── seed.js            # Seed data
│   ├── routes/
│   │   ├── projects.js    # Projects CRUD
│   │   ├── settings.js    # Settings CRUD
│   │   ├── upload.js      # File upload
│   │   ├── auth.js        # Admin authentication
│   │   └── admin.js       # Admin panel route
│   ├── models/
│   │   ├── Project.js     # Project schema
│   │   └── Settings.js    # Settings schema
│   ├── views/
│   │   ├── admin.html     # Admin panel
│   │   └── login.html     # Admin login
│   └── uploads/           # Uploaded images
├── css/
│   └── style.css          # All styles
├── js/
│   └── main.js            # All frontend JS
├── index.html             # Main page
├── 404.html               # Custom 404 page
├── favicon.svg            # Site favicon
├── vercel.json            # Vercel config
├── package.json           # Dependencies
└── .gitignore
```

## Local Setup

1. Clone the repo
```bash
git clone https://github.com/Abdelrahman30612/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Add Firebase service account
   - Place `server/serviceAccount.json` (ask Abdelrahman for the file)

4. Start the server
```bash
npm start
```

5. Open in browser
```
http://localhost:3000
```

## Admin Panel

- **URL:** `http://localhost:3000/admin`
- **Default Password:** Check with Abdelrahman
- Change password from Admin Panel → Footer → Admin Password

### What you can edit:
| Section | Content |
|---------|---------|
| Hero | Headline, description, button, status badge, quote |
| About | Greeting, paragraphs, button text |
| Skills | Add/edit/delete skill categories |
| Timeline | Add/edit/delete experience items |
| Blog | Add/edit/delete blog posts |
| Testimonials | Add/edit/delete client reviews |
| Contact | Description, discord, email, social links |
| Footer | Meta info, newsletter, copyright, start year, clients |
| Projects | Full CRUD with image upload |

## Deployment

### Railway (Recommended)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. New Project → Deploy from GitHub repo
4. Add Environment Variables:
   - `FIREBASE_SERVICE_ACCOUNT` - paste the JSON content
   - `PORT` - `3000`
5. Generate domain from Settings → Networking

### Vercel

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add Environment Variable:
   - `FIREBASE_SERVICE_ACCOUNT` - paste the JSON content
4. Deploy

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create project → Firestore Database → Create (test mode)
3. Project Settings → Service Accounts → Generate new private key
4. Save as `server/serviceAccount.json`

## License

Made by Abdelrahman
