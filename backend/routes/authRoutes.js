
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

// Registration
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Protected Profile
router.get('/profile', verifyToken, authController.getProfile);

// Logout
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
