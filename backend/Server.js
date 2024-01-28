// server.js
const express = require('express');
const mongoose = require('mongoose');
const OTP = require('./models/OTP'); // Import the OTP model
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://revathyr1914:<password>@cluster0.zwb04n0.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is connected successfully"))
.catch((err) => console.error(err));

const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.error('MongoDB connection error:', err));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password',
  },
});

// Route to send OTP
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(); // Implement your OTP generation logic here

  try {
    // Save OTP to MongoDB
    await OTP.create({ email, otp });

    // Send OTP to email
    await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Your OTP',
      text: `Your OTP is: ${otp}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ error: 'Error sending OTP' });
  }
});

// Route to verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if OTP exists in the database
    const otpRecord = await OTP.findOne({ email, otp });

    if (otpRecord) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ error: 'Error verifying OTP' });
    
  }
});

// Generate random OTP function
function generateOTP() {
  const length = 6; // Length of OTP
  const characters = '0123456789'; // Characters to include in OTP
  let otp = '';

  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return otp;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
