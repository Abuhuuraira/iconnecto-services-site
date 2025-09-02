const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Serve Rewards frontend at /rewards
app.use('/rewards', express.static(path.join(__dirname, '../referral_rewards_app/public')));

// 📩 Email API
app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name} - ${subject}`,
      text: `From ${name} (${email}):\n\n${message}`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Fallback: index.html for frontend routes
app.get('/rewards/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../referral_rewards_app/public/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
