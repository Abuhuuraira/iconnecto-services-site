# Referral & Rewards App (Purple • White • Black Theme)

A full working **Referral & Rewards** page with **backend integration** (Node.js + Express + MongoDB) and a polished UI.

## Features
- Generate unique **referral link** per user
- **Copy** & **Share** (Web Share API fallback)
- Track **points** (100 per referral), redeem at **500**
- **Progress bar**, **leaderboard**
- Referral landing flow: `/?ref=CODE` shows a signup card that credits the referrer
- Clean, responsive **purple/white/black** theme

## Quick Start

1) **Install dependencies**
```bash
npm install
```

2) **Run MongoDB**
- Local: install and run `mongod`
- Or use **MongoDB Atlas** and set `MONGODB_URI` in a `.env` file

3) **Start the server**
```bash
npm start
```
Open http://localhost:5000

### Optional: .env
Create a `.env` file in project root:
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/referralDB
PORT=5000
```

## How it works
- Visit the page, enter a username → your account is created and your **referral link** appears.
- Share the link. When someone opens `/?ref=YOURCODE`, they’ll see a simple signup card. When they complete it, your account gets +100 points.
- Press **Redeem 500** to spend points (subtracts 500).

## File Structure
```
referral_rewards_app/
  ├─ server.js          # Express + API + static hosting
  ├─ package.json
  ├─ public/
  │   ├─ index.html     # UI
  │   ├─ style.css      # Purple/white/black theme
  │   └─ app.js         # Frontend logic (fetch API)
  └─ README.md
```

## Notes
- This is a self-contained demo. Replace the "Complete Sign Up" flow with your real auth later.
- Points per referral and redeem threshold are set in `server.js` (100 & 500). Adjust as needed.
