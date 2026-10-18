# Web-Slinger Questfolio 🕸️🎮

A comic-book & arcade video game styled developer portfolio for **Aditya Shah — Friendly Neighbourhood Engineer**, inspired by Spider-Man and retro gaming aesthetics.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## 🚀 Features

- **Comic & Retro Aesthetic**:
  - Bangers & Press Start 2P typography
  - Halftone dot texture overlays
  - Bold ink borders (`border-ink`) & hard-drop comic shadows (`var(--shadow-comic)`)
  - Glitch animations & glowing hero overlay
  - Yellow comic speech bubbles
- **Gamified Elements**:
  - Live XP Level Calculation in top navigation (`XP 360`)
  - RPG Skill Tree with dynamic tier labeling (`LEGENDARY`, `EPIC`, `RARE`, `COMMON`) and animated XP fill bars
  - Quest Completed cards with issue badge and tech tags
  - Achievement Loot unlocks with badges
  - Passive Perks badges
- **Control Room Admin Dashboard (`/admin`)**:
  - Arcade-style authentication: "INSERT COIN TO CONTINUE" / "CREATE PLAYER"
  - Manage all 4 database collections live:
    - **Projects** (Title, Description, Tech list, Live link, GitHub link, Image)
    - **Skills** (Skill name, Category, Level 0-100)
    - **Certifications** (Title, Issuer, Date, Credential link, Image)
    - **Interests** (Interest name, Emoji)
  - Add and delete records with instant UI updates and toast notifications.
  - Built-in resilient local storage caching & fallback so it works instantly out-of-the-box offline and online.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables & Animations
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Backend / Database**: Supabase Client (`@supabase/supabase-js`)

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🔑 Supabase Configuration (Optional)

To connect your own Supabase instance:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

If no environment variables are provided, the portfolio seamlessly defaults to the bundled initial dataset with local persistence!
