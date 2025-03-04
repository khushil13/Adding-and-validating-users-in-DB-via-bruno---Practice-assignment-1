const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Import the User model

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect("mongodb+srv://choprakhushil13:1rfebIFKUYUBCiDe@cluster0.nhg4l.mongodb.net/ecom_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
  }

  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
          username,
          email,
          password: hashedPassword,
      });

      // Save user to database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${5000}`));
