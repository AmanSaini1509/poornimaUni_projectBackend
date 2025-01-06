const Authentication = require('../models/authentication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Log the incoming request
  console.log('Login request received:', { username });

  try {
    // Check if the user exists
    const user = await Authentication.findOne({ username });
    if (!user) {
      console.log('User not found:', { username });
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the password validation attempt
    console.log('Validating password for user:', username);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password Valid:', isPasswordValid);
    
    // If the password is invalid
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If the password is valid, generate the token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.authToken = token;
    await user.save();

    console.log('Login successful for user:', username);
    res.status(200).json({ token, role: user.role, _id: user._id  });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// User Logout
exports.logout = async (req, res) => {
  const { userId } = req.body;

  console.log('Logout request received for user ID:', userId);

  try {
    const user = await Authentication.findById(userId);
    if (!user) {
      console.log('User not found for logout:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    user.authToken = null;
    await user.save();

    console.log('Logout successful for user ID:', userId);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
