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
