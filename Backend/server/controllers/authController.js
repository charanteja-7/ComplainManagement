const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
  
    // Validate role
    const validRoles = ['student', 'admin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role || 'student', // default to student
    });
  
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  };
  

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ important
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  };
  
// Get User Profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };

