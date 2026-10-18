# Web-Slinger Questfolio 🕸️🎮

A comic-book & retro gaming styled portfolio for **Aditya Shah — Friendly Neighbourhood Engineer**, complete with a dedicated **Backend API** and **Frontend Web Application**.

---

## 📁 Repository Structure

```
portfolio/
├── backend/                  # Node.js + Express API server
│   ├── data/
│   │   └── db.json           # Persistent database
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   ├── uploads/              # Uploaded certificates & project images
│   ├── .env                  # Backend port & JWT secret
│   ├── db.js                 # DB read/write helper & seed data
│   ├── package.json
│   └── server.js             # API server & routes
├── frontend/                 # React 18 + Vite + Tailwind CSS SPA
│   ├── public/
│   │   ├── favicon.ico
│   │   └── hero.jpg
│   ├── src/
│   │   ├── components/       # Quests, Skill Tree, Loot & Perks UI
│   │   ├── lib/
│   │   │   ├── api.ts        # Backend API client with file uploads
│   │   │   └── utils.ts
│   │   ├── pages/
│   │   │   ├── Admin.tsx     # Control Room admin panel
│   │   │   └── Portfolio.tsx # Main portfolio page
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts        # Configured with proxy to backend (/api & /uploads)
├── package.json              # Root orchestration scripts
└── README.md
```

---

## ⚡ Quick Start

### 1. Start the Backend Server
In one terminal:
```powershell
cd backend
npm run dev
```
The backend starts on `http://localhost:5000`.

### 2. Start the Frontend Application
In a second terminal:
```powershell
cd frontend
npm run dev
```
The frontend starts on `http://localhost:5173`.

---

## 🛡️ Admin & Control Room Features (`/admin`)

1. **Authentication**:
   - Navigate to `http://localhost:5173/admin` (or click `ADMIN` in the footer).
   - Click *"First time? Create the admin account"* to register. The very first registered user automatically becomes the **Admin**.
   - Subsequent logins use the same email and password.
   - JWT tokens are securely verified for all mutations.

2. **File Uploads for Certificates & Projects**:
   - When adding a **Certification**, click **UPLOAD FILE** to upload image or PDF certificates directly.
   - Files are stored in `backend/uploads/` and served via `/uploads/...`.
   - Projects also support direct file upload for preview images.

3. **Dynamic Skill Tree & Projects Management**:
   - Add new skills with category and level (0–100). The frontend automatically assigns RPG tiers (`LEGENDARY`, `EPIC`, `RARE`, `COMMON`) and updates the live XP counter.
   - Add completed quests/projects with tech stacks and live/code links.
   - Delete any entry with the comic trash icon.

---

## ☁️ Production Cloud Storage & Database (MongoDB Atlas + Cloudinary)

This project features a **hybrid cloud architecture**:
* **Local Mode (Default)**: Works immediately with zero setup using local `backend/data/db.json` and `backend/uploads/`.
* **Cloud Mode (Production)**: When environment variables are configured, the backend automatically switches to **MongoDB Atlas** for database persistence and **Cloudinary** for permanent image/PDF CDN hosting.

### Environment Variables (`backend/.env`):
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key

# 1. MongoDB Atlas (Free 512MB tier)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/questfolio?retryWrites=true&w=majority

# 2. Cloudinary (Free 25GB tier)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=questfolio
```

> **Note on Initial Seeding**: On the first connection to MongoDB Atlas, the backend automatically seeds all existing projects, skills, certifications, and interests from `db.json` so you never start with an empty database!

---

## 🚀 Deployment Guide

### Option A: Free Full-Stack Deployment
1. **Database**: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get your connection string.
2. **Media Storage**: Sign up for free on [Cloudinary](https://cloudinary.com) and copy your Cloud Name, API Key, and API Secret.
3. **Backend on Render.com** (Free Web Service):
   - Connect your GitHub repo `portfolio4`.
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add your Environment Variables (`MONGODB_URI`, `CLOUDINARY_*`, `JWT_SECRET`).
4. **Frontend on Vercel.com** (Free):
   - Import your GitHub repo `portfolio4`.
   - Root Directory: `frontend`
   - In `vite.config.ts` or as an environment variable, point API proxy requests to your live Render backend URL.

### Option B: Zero-Server Static Deployment (Vercel Only)
If you prefer not to host a backend server, you can deploy just the `frontend/` folder on **Vercel**. All initial portfolio data is packaged inside `frontend/src/lib/api.ts`, and project images can be placed directly in `frontend/public/`.
