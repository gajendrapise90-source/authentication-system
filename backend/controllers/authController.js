
const crypto = require('crypto');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// User Registration
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Validate username
        if (username.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: 'Username must be at least 3 characters'
            });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters'
            });
        }

        const cleanUsername = username.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Check duplicate email
        User.findByEmail(cleanEmail, async (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Database error'
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Save user
            User.create(
                cleanUsername,
                cleanEmail,
                hashedPassword,
                (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(409).json({
                                success: false,
                                message: 'Email already registered'
                            });
                        }

                        return res.status(500).json({
                            success: false,
                            message: 'Registration failed'
                        });
                    }

                    return res.status(201).json({
                        success: true,
                        message: 'Registration successful',
                        userId: result.insertId
                    });
                }
            );
        });

    } catch (error) {
        console.error('Registration error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const jwt = require('jsonwebtoken');

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        // Find user
        User.findByEmail(cleanEmail, async (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Database error'
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const user = results[0];

            // Verify password
            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token: token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });

    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// Get logged-in user profile
exports.getProfile = (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT id, username, email, created_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Database error'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Protected profile accessed successfully',
            user: results[0]
        });
    });
};

// User Logout
exports.logout = (req, res) => {
    const token = req.token;

    const tokenHash = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const expiresAt = new Date(req.user.exp * 1000);

    const sql = `
        INSERT INTO revoked_tokens (token_hash, expires_at)
        VALUES (?, ?)
    `;

    db.query(sql, [tokenHash, expiresAt], (err) => {
        if (err) {
            console.error('Logout error:', err.message);

            return res.status(500).json({
                success: false,
                message: 'Logout failed'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    });
};
