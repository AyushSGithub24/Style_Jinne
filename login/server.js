const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'qwertyuiopasdfghjklkzxcvbnm'; // Change this to a secure random string in production

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database (replace with a real database in production)
const users = [];

// Helper function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate password strength
function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate name size
    if (name.length < 3 || name.length > 30) {
      return res.status(400).json({ message: 'Name must be between 3 and 30 characters long' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character' 
      });
    }

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { name, email, password: hashedPassword };
    users.push(newUser);

    // Generate JWT
    const token = jwt.sign({ email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error: error.message });
  }
});

app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Signed in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user });
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
