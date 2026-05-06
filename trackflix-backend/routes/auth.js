const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// JWT Secret (should be in .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Helper function to generate JWT token
const generateToken = (userId, email, isAdmin = false) => {
  return jwt.sign(
    { userId, email, isAdmin },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Password strength validation
    const passwordValidation = validatePasswordStrength(password);
    if (passwordValidation.score < 3) {
      return res.status(400).json({ 
        error: 'Password is too weak. Please include uppercase, lowercase, numbers, and special characters.',
        requirements: passwordValidation.requirements
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, user.email, user.isAdmin);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        pro: user.pro
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.email, user.isAdmin);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        pro: user.pro
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Password strength validation function (same as frontend)
function validatePasswordStrength(password) {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const score = Object.values(requirements).filter(Boolean).length;
  
  return { requirements, score };
}

// GET /api/auth/verify - Verify JWT token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ valid: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ valid: false, error: 'User not found' });
    }

    res.json({ valid: true, user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      pro: user.pro
    }});
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ valid: false, error: 'Invalid token' });
    }
    console.error('Token verification error:', error);
    res.status(500).json({ valid: false, error: 'Server error' });
  }
});

module.exports = router;
