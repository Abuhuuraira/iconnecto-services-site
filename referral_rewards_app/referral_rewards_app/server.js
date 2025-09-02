/**
 * Referral & Rewards App - Backend (Express + MongoDB)
 * - Serves static frontend from /public
 * - REST API for users, referrals, rewards
 * - Generates referral **links**
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;


const MONGODB_URI = "mongodb://127.0.0.1:27017/referralDB";



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Connect MongoDB
mongoose
  .connect(MONGODB_URI, { dbName: "referralDB" })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Schemas
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    referralCode: { type: String, required: true, unique: true },
    referralLink: { type: String }, // ✅ store link
    points: { type: Number, default: 0 },
    referredUsers: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Helpers
const makeCode = (username) => {
  const stamp = Math.floor(Date.now() / 1000).toString(36);
  return `${username.toLowerCase()}-${stamp}`;
};

// Routes
app.post("/api/create-user", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username || !username.trim()) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Check if user already exists
    const existing = await User.findOne({ username: username.trim() });
    if (existing) return res.status(200).json(existing);

    const referralCode = makeCode(username.trim());
    const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
    const referralLink = `${BASE_URL}/ref/${referralCode}`;

    const user = await User.create({
      username: username.trim(),
      referralCode,
      referralLink,
    });

    return res.json(user);
  } catch (e) {
    console.error("❌ Error in /api/create-user:", e); // 👈 now it logs full error
    return res.status(500).json({ error: e.message || "Server error" });
  }
});


app.get("/api/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/refer", async (req, res) => {
  try {
    const { referralCode, newUser } = req.body;
    if (!referralCode || !newUser) {
      return res
        .status(400)
        .json({ error: "referralCode and newUser required" });
    }

    const referrer = await User.findOne({ referralCode });
    if (!referrer)
      return res.status(404).json({ error: "Referral code not found" });

    // avoid double-credit
    if (referrer.referredUsers.includes(newUser)) {
      return res.json({ message: "Already credited for this user", referrer });
    }

    referrer.referredUsers.push(newUser);
    referrer.points += 100; // points per referral
    await referrer.save();

    return res.json({ message: "Referral credited", referrer });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/redeem", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.points >= 500) {
      user.points -= 500;
      await user.save();
      return res.json({ message: "🎁 Reward redeemed!", user });
    } else {
      return res
        .status(400)
        .json({ error: "Not enough points to redeem (need 500)" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/leaderboard", async (_req, res) => {
  try {
    const top = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select("username points");
    return res.json(top);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route to handle referral link visits
app.get("/ref/:referralCode", async (req, res) => {
  try {
    const referrer = await User.findOne({
      referralCode: req.params.referralCode,
    });
    if (!referrer) {
      return res.status(404).send("Invalid referral link");
    }
    // For now redirect to homepage with code (frontend can handle signup)
    return res.redirect(`/?ref=${referrer.referralCode}`);
  } catch (e) {
    console.error(e);
    return res.status(500).send("Server error");
  }
});

// Fallback to SPA
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at ${BASE_URL}`)
);
